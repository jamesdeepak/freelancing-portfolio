# Deepak — Freelance Web Developer

> A professional freelance website built to showcase my services, featured work, client communication and project inquiry system.

🌐 **Local Development:** `http://localhost:5000`

🔐 **Admin Panel:** `http://localhost:5000/confidential`

---

## 🚀 About the Project

This is my personal **freelance web developer website**, designed to present my services, experience, featured work and provide potential clients with an easy way to contact me.

The website is focused on creating a professional client experience rather than functioning as a traditional student portfolio.

It allows visitors to:

* Explore my freelance services
* View my featured work
* Contact me directly
* Submit a project inquiry
* Request a freelance project
* Submit client reviews
* Give ratings from 1–5 stars
* Upload project screenshots with reviews

The website also includes a private administrative area for managing client inquiries, project notes and testimonial submissions.

---

## ✨ Key Features

### 💼 Freelance Services

Showcases services including:

* Business Website Development
* Responsive Web Development
* Web Applications
* AI-Powered Solutions
* Website Redesign
* Deployment & Support

### 🌐 Featured Work

Currently showcases:

**Raja Transport**

A live business website created to provide a professional digital presence.

🔗 Live Website:
https://rajatransport.lovable.app/

More projects will be added as they are completed.

### 📩 Client Project Registration

Potential clients can submit their project requirements through a dedicated form.

The form can collect:

* Name
* Email
* Phone
* Address
* Business Name
* Project Type
* Requirements
* Budget
* Timeline
* Preferred Contact Method
* Additional Details

### ⭐ Client Review System

Clients can submit genuine feedback through the review system.

Features include:

* Gmail/email verification requirement
* 1–5 star rating
* Written review
* Optional project screenshot/image
* Review moderation
* Public display of approved reviews

> No fake testimonials are used.

### 🔐 Private Admin Dashboard

A confidential administrative area is available for managing:

* Client inquiries
* Client information
* Project status
* Private project notes
* Review submissions
* Review approval/rejection

Admin authentication is handled separately from the public website.

**Never store the admin password directly in the frontend source code or README.**

### 📊 Client Data Management

Client inquiry information can be connected to Google Sheets through a Google Apps Script Web App.

The intended workflow is:

```text
Client
   ↓
Project Registration Form
   ↓
Website
   ↓
Google Apps Script
   ↓
Google Sheets
   ↓
Client Records
```

### 📱 Direct Contact

Clients can contact me through:

* Phone
* WhatsApp
* Email
* Project Registration Form
* LinkedIn

### 🌓 Light / Dark Theme

The website supports:

* Light Theme — Default
* Dark Theme

The selected theme is persisted for future visits.

### 📱 Fully Responsive

Designed for:

* Mobile
* Tablet
* Laptop
* Desktop
* Large screens

---

## 🎨 Design Philosophy

The website follows a:

* Clean
* Professional
* Minimal
* Modern
* Human-designed
* Client-focused

visual style.

The design intentionally avoids excessive AI-style visuals, unnecessary animations and overused futuristic effects.

Animations are subtle and used mainly for:

* Scroll reveals
* Hover interactions
* Navigation transitions
* Image interactions
* Button feedback
* Theme transitions

The goal is to make the website feel like a professionally designed freelance brand rather than an automatically generated portfolio.

---

## 🛠️ Technologies

The project may use technologies such as:

### Frontend

* HTML
* CSS
* JavaScript

### Backend / Application

* JavaScript / Node.js
* API integrations
* Server-side routes

### Data

* Google Sheets
* Google Apps Script

### AI / Development

* AI-assisted development
* Google Antigravity

### Tools

* Git
* GitHub
* VS Code
* Figma

> The exact technology stack may evolve as the project develops.

---

## 📂 Project Structure

A typical structure:

```text
freelance-portfolio/
│
├── public/
│   ├── images/
│   ├── icons/
│   └── assets/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── utils/
│
├── server/
│   ├── routes/
│   └── services/
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

The actual structure may vary depending on the implementation.

---

## 🔐 Security

Sensitive information must NOT be committed to GitHub.

Use environment variables for:

```text
ADMIN_PASSWORD
GOOGLE_APPS_SCRIPT_URL
GOOGLE_SHEETS_ID
EMAIL_API_KEY
WHATSAPP_API_KEY
OTHER_SECRET_KEYS
```

Example:

```env
ADMIN_PASSWORD=your-secure-password
GOOGLE_APPS_SCRIPT_URL=your-app-script-url
```

Make sure `.env` is included in `.gitignore`.

### ⚠️ Important

Never commit:

* Passwords
* API keys
* Access tokens
* Google service credentials
* Private client information
* Database credentials

The `/confidential` page must use proper server-side authentication rather than a password check implemented only in browser JavaScript.

---

## 🖥️ Running Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Enter the project

```bash
cd freelance-portfolio
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file and add the required private configuration.

Example:

```env
ADMIN_PASSWORD=your-secure-password
GOOGLE_APPS_SCRIPT_URL=your-app-script-url
```

### 5. Start the development server

```bash
npm run dev
```

or, depending on the project configuration:

```bash
npm start
```

### 6. Open the website

Open:

```text
http://localhost:5000
```

### 7. Open the confidential admin panel

Open:

```text
http://localhost:5000/confidential
```

Use the private admin credentials configured in your environment.

**Do not publish the password in this README.**

---

## 📬 Client Inquiry Flow

```text
Visitor
   │
   ▼
Freelance Website
   │
   ▼
Start a Project
   │
   ▼
Client Registration
   │
   ├──────────────► Google Sheets
   │
   ├──────────────► Email Notification
   │
   └──────────────► WhatsApp Notification
                         │
                         ▼
                    Deepak
```

---

## ⭐ Review Flow

```text
Client
   ↓
Review Form
   ↓
Email Required
   ↓
1–5 Star Rating
   ↓
Review + Optional Screenshot
   ↓
Pending Review
   ↓
Admin Approval
   ↓
Public Testimonial
```

Only approved genuine client reviews should appear publicly.

---

## 👨‍💻 About Me

I'm **Deepak**, a B.Tech Artificial Intelligence & Data Science student and freelance web developer.

I build modern websites, web applications and practical AI-powered solutions for businesses and individuals.

### Areas I Work With

* Web Development
* Responsive UI
* Java
* Spring Boot
* JavaScript
* SQL
* AI Applications
* RAG
* LangChain
* LangGraph

---

## 🔗 Connect With Me

### LinkedIn

https://www.linkedin.com/in/deepak-ai-tech/

### Live Project

Raja Transport:

https://rajatransport.lovable.app/

### Contact

Phone / WhatsApp:

`+91 9500142806`

Email:

`YOUR_EMAIL_HERE`

---

## 📌 Current Status

This website is an actively developing freelance platform.

The number of featured projects will grow as I complete new client projects.

Future improvements may include:

* More client case studies
* Additional projects
* Improved client dashboard
* Automated email notifications
* WhatsApp integration
* Advanced review verification
* Project status tracking
* Client communication tools

---

## 📄 License

This project represents my personal professional portfolio.

Please do not copy, redistribute or reuse the personal branding, content, photographs or private client information without permission.

---

### Built with ❤️ by Deepak

**Freelance Web Developer | AI Enthusiast**
