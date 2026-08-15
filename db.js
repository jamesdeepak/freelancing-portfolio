import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve('./data');
const CLIENTS_FILE = path.join(DATA_DIR, 'clients.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');

// Ensure data directory and files exist
function initDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(CLIENTS_FILE)) {
    fs.writeFileSync(CLIENTS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
  if (!fs.existsSync(REVIEWS_FILE)) {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

// Atomic file writing
function writeJsonAtomic(filePath, data) {
  const tempPath = `${filePath}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempPath, filePath);
}

function readJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading database file ${filePath}:`, error);
    return [];
  }
}

initDb();

export const db = {
  // Clients DB
  getClients() {
    return readJson(CLIENTS_FILE);
  },
  
  saveClient(client) {
    const clients = this.getClients();
    const newClient = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
      date: new Date().toISOString(),
      status: 'New',
      notes: '',
      followUpDate: '',
      ...client
    };
    clients.push(newClient);
    writeJsonAtomic(CLIENTS_FILE, clients);
    return newClient;
  },

  updateClient(id, updates) {
    const clients = this.getClients();
    const index = clients.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    clients[index] = {
      ...clients[index],
      ...updates,
      // Ensure key immutable values don't get changed accidentally
      id: clients[index].id,
      date: clients[index].date
    };
    
    writeJsonAtomic(CLIENTS_FILE, clients);
    return clients[index];
  },

  // Reviews DB
  getReviews() {
    return readJson(REVIEWS_FILE);
  },

  getApprovedReviews() {
    return this.getReviews().filter(r => r.status === 'approved');
  },

  saveReview(review) {
    const reviews = this.getReviews();
    const newReview = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
      date: new Date().toISOString(),
      status: 'pending', // Default is pending for moderation
      ...review
    };
    reviews.push(newReview);
    writeJsonAtomic(REVIEWS_FILE, reviews);
    return newReview;
  },

  updateReviewStatus(id, status) {
    const reviews = this.getReviews();
    const index = reviews.findIndex(r => r.id === id);
    if (index === -1) return null;

    reviews[index].status = status; // 'approved', 'rejected', 'pending'
    writeJsonAtomic(REVIEWS_FILE, reviews);
    return reviews[index];
  },

  deleteReview(id) {
    let reviews = this.getReviews();
    const index = reviews.findIndex(r => r.id === id);
    if (index === -1) return false;

    reviews = reviews.filter(r => r.id !== id);
    writeJsonAtomic(REVIEWS_FILE, reviews);
    return true;
  }
};
