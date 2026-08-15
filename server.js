import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { db } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'deepak_freelance_secret_key_2026';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '270821';

// Setup file uploads configuration
const UPLOADS_DIR = path.resolve('./uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `screenshot-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit size to 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images (jpg, jpeg, png, webp) are allowed!'));
  }
});

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static uploads
app.use('/uploads', express.static(UPLOADS_DIR));

// Helper: Authentication check middleware
const requireAuth = (req, res, next) => {
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) {
    return res.status(401).json({ success: false, error: 'Unauthorized. Token missing.' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Unauthorized. Invalid token.' });
  }
};

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ success: false, error: 'Password required' });
  }
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
    
    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    return res.json({ success: true, token });
  }
  return res.status(401).json({ success: false, error: 'Invalid password' });
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ success: true, message: 'Logged out successfully' });
});

app.get('/api/auth/check', (req, res) => {
  const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) {
    return res.json({ authenticated: false });
  }
  try {
    jwt.verify(token, JWT_SECRET);
    return res.json({ authenticated: true });
  } catch (err) {
    return res.json({ authenticated: false });
  }
});

// ==========================================
// CLIENT REGISTRATION & INTEGRATION ROUTES
// ==========================================

app.post('/api/clients/register', async (req, res) => {
  try {
    const {
      name, email, phone, address, businessName,
      projectType, requirement, budget, timeline,
      preferredContact, additionalDetails
    } = req.body;

    // Simple validation
    if (!name || !email || !requirement) {
      return res.status(400).json({ success: false, error: 'Name, Email and Requirements are required.' });
    }

    // Save locally
    const clientData = {
      name, email, phone: phone || '', address: address || '',
      businessName: businessName || '', projectType: projectType || '',
      requirement, budget: budget || '', timeline: timeline || '',
      preferredContact: preferredContact || '', additionalDetails: additionalDetails || ''
    };
    
    const savedClient = db.saveClient(clientData);

    // Prepare payload for external services
    const dateFormatted = new Date(savedClient.date).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const payload = {
      Date: dateFormatted,
      Name: name,
      Email: email,
      Phone: phone || '',
      Address: address || '',
      BusinessName: businessName || '',
      ProjectType: projectType || '',
      Requirement: requirement,
      Budget: budget || '',
      Timeline: timeline || '',
      PreferredContact: preferredContact || '',
      AdditionalDetails: additionalDetails || '',
      Status: 'New',
      Notes: ''
    };

    // 1. Forward to Google Sheets Web App
    const sheetsUrl = process.env.GOOGLE_SHEETS_URL;
    let sheetsSuccess = false;
    let sheetsErrorMsg = null;

    if (sheetsUrl) {
      try {
        console.log(`[Google Sheets] Forwarding client inquiry to: ${sheetsUrl}`);
        // We do a POST request. We support standard fetch formatting.
        // Google Sheets web apps can be picky, so we send as JSON but will also catch redirection
        const response = await fetch(sheetsUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8', // Avoids preflight CORS issues in some apps script setups
          },
          body: JSON.stringify(payload)
        });
        
        const responseText = await response.text();
        console.log('[Google Sheets] Web App raw response:', responseText.substring(0, 500));
        sheetsSuccess = response.ok;
      } catch (err) {
        console.error('[Google Sheets] Error forwarding data:', err);
        sheetsErrorMsg = err.message;
      }
    } else {
      console.log('[Google Sheets] GOOGLE_SHEETS_URL is not set. Skipped forward.');
    }

    // 2. Trigger WhatsApp Notification
    const waUrl = process.env.WHATSAPP_API_URL;
    const waToken = process.env.WHATSAPP_TOKEN;
    const waRecipient = process.env.WHATSAPP_RECIPIENT || '9500142806';

    const whatsappMessage = `*NEW FREELANCE CLIENT INQUIRY*\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*Phone:* ${phone || 'N/A'}\n` +
      `*Address:* ${address || 'N/A'}\n` +
      `*Business:* ${businessName || 'N/A'}\n` +
      `*Project Type:* ${projectType || 'N/A'}\n` +
      `*Requirement:* ${requirement}\n` +
      `*Budget:* ${budget || 'N/A'}\n` +
      `*Timeline:* ${timeline || 'N/A'}\n` +
      `*Preferred Contact:* ${preferredContact || 'N/A'}\n` +
      `*Additional Details:* ${additionalDetails || 'N/A'}\n` +
      `*Date:* ${dateFormatted}`;

    if (waUrl && waToken) {
      try {
        console.log(`[WhatsApp] Sending message to ${waRecipient}`);
        await fetch(waUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${waToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: waRecipient,
            type: 'text',
            text: { body: whatsappMessage }
          })
        });
      } catch (err) {
        console.error('[WhatsApp] Error sending notification:', err);
      }
    } else {
      console.log('--- MOCK WHATSAPP NOTIFICATION ---');
      console.log(`Recipient: ${waRecipient}`);
      console.log(whatsappMessage);
      console.log('----------------------------------');
    }

    // 3. Trigger Email Notification (Nodemailer fallback)
    const emailRecipient = process.env.SMTP_USER || process.env.EMAIL_RECIPIENT || 'jamesdeepak092005@gmail.com';
    console.log('--- MOCK EMAIL NOTIFICATION ---');
    console.log(`To: ${emailRecipient}`);
    console.log(`Subject: New Freelance Project Inquiry - ${name}`);
    console.log(`Body:\n`, payload);
    console.log('-------------------------------');

    return res.status(201).json({
      success: true,
      message: 'Inquiry registered successfully',
      client: savedClient,
      integrations: {
        sheets: sheetsSuccess ? 'success' : sheetsUrl ? `failed (${sheetsErrorMsg})` : 'not_configured',
        whatsapp: waUrl && waToken ? 'sent' : 'logged',
        email: 'logged'
      }
    });
  } catch (err) {
    console.error('Registration API Error:', err);
    return res.status(500).json({ success: false, error: 'Server error processing inquiry' });
  }
});

// ==========================================
// TESTIMONIAL SUBMISSION (PUBLIC)
// ==========================================

app.post('/api/reviews', upload.single('image'), (req, res) => {
  try {
    const { name, email, businessName, rating, review } = req.body;

    if (!name || !email || !rating || !review) {
      return res.status(400).json({ success: false, error: 'Name, Email, Rating and Review text are required.' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }

    const ratingVal = parseInt(rating, 10);
    if (isNaN(ratingVal) || ratingVal < 1 || ratingVal > 5) {
      return res.status(400).json({ success: false, error: 'Rating must be a number between 1 and 5.' });
    }

    let imagePath = '';
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const savedReview = db.saveReview({
      name,
      email,
      businessName: businessName || '',
      rating: ratingVal,
      review,
      imagePath
    });

    return res.status(201).json({
      success: true,
      message: 'Review submitted successfully. It will appear on the site once moderated.',
      review: {
        id: savedReview.id,
        name: savedReview.name,
        rating: savedReview.rating,
        status: savedReview.status
      }
    });
  } catch (err) {
    console.error('Review API Error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Server error processing review' });
  }
});

// Fetch approved reviews (Public)
app.get('/api/reviews/active', (req, res) => {
  try {
    const activeReviews = db.getApprovedReviews();
    return res.json(activeReviews);
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to fetch testimonials' });
  }
});

// ==========================================
// ADMIN PROTECTED ROUTES
// ==========================================

// Get all clients (Admin only)
app.get('/api/admin/clients', requireAuth, (req, res) => {
  try {
    const clients = db.getClients();
    // Sort by date descending
    clients.sort((a, b) => new Date(b.date) - new Date(a.date));
    return res.json(clients);
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to fetch clients' });
  }
});

// Update client notes/status/follow-up (Admin only)
app.put('/api/admin/clients/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, followUpDate } = req.body;
    
    const updated = db.updateClient(id, { status, notes, followUpDate });
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Client not found' });
    }
    return res.json({ success: true, client: updated });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to update client info' });
  }
});

// Get all reviews for moderation (Admin only)
app.get('/api/admin/reviews', requireAuth, (req, res) => {
  try {
    const reviews = db.getReviews();
    // Sort by date descending
    reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
    return res.json(reviews);
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to fetch reviews' });
  }
});

// Moderate review status (Admin only)
app.put('/api/admin/reviews/:id/status', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'approved' or 'rejected'

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status value' });
    }

    const updated = db.updateReviewStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Review not found' });
    }
    return res.json({ success: true, review: updated });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to update review status' });
  }
});

// Delete review (Admin only)
app.delete('/api/admin/reviews/:id', requireAuth, (req, res) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteReview(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Review not found' });
    }
    return res.json({ success: true, message: 'Review deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to delete review' });
  }
});

// ==========================================
// PRODUCTION FRONTEND SERVING
// ==========================================

const CLIENT_BUILD_DIR = path.resolve('./frontend/dist');
app.use(express.static(CLIENT_BUILD_DIR));

// React client side routing fallback
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/') || req.path.startsWith('/uploads/')) {
    return next();
  }
  
  const indexHtml = path.join(CLIENT_BUILD_DIR, 'index.html');
  if (fs.existsSync(indexHtml)) {
    return res.sendFile(indexHtml);
  }
  
  return res.status(404).send('Frontend application build not found. Run backend in development or execute build command.');
});

// Start Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`Deepak's Freelance Backend running on http://localhost:${PORT}`);
  console.log(`Authentication Password configured as: ${ADMIN_PASSWORD}`);
  console.log(`Static file uploads mapped to: ${UPLOADS_DIR}`);
  console.log(`=======================================================`);
});
