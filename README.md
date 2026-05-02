🛡️ Consumer Trust Platform

A unified web application to help consumers verify product safety, authenticity, and quality across multiple domains like food, alcohol, and water.

🔗 Important Links
🎨 Figma Design: https://www.figma.com/design/YBDuWGLy6yqIYLaZHGoAnE/HW-7-8--minecraft-valo?node-id=2015-1786&t=wiNyJq0RSRw7qaG2-1
🌐 Live Project: https://trust-pulse-blue.vercel.app/
📬 Postman API Docs: https://documenter.getpostman.com/view/50839376/2sBXqKofA8
🎥 YouTube Demo: [https://your-youtube-link.com](https://youtu.be/711ulGf-7ck)
🧠 Problem Statement

Consumers today face a major lack of transparency when purchasing everyday products.

Packaged foods contain hidden sugars that are difficult to interpret
Alcohol authenticity cannot be verified easily
Delivered water quality is uncertain
There is no unified platform to validate product safety

Most solutions are fragmented or require hardware-based systems, making them impractical.

👉 There is a need for a software-based unified consumer trust platform.

🚀 Solution

This project introduces a Consumer Trust Platform that allows users to:

Scan products using barcode/QR
Track sugar intake in understandable formats
Verify alcohol authenticity
Check water purity
Report suspicious or unsafe products

All features are integrated into a single, clean, and accessible web application.

🎯 Features
🔍 Product Scan System
Global scan functionality
Module-specific scan actions
Barcode / QR-based input
🍬 Sugar Tracker
Converts grams → teaspoons
Tracks daily intake
Shows percentage of daily limit
Visual progress indicators
🍷 Alcohol Verification
Verifies product authenticity
Detects duplicate usage
Displays batch and manufacturer details
💧 Water Verification
Displays TDS levels
Shows purification status
Supplier trust scoring
📢 Complaint System
Multi-step reporting form
File upload (image proof)
User-friendly submission flow
🎨 UI/UX
Fully responsive design
Light/Dark theme support
Clean and modern interface
🧱 Tech Stack
Frontend
React (Vite)
Tailwind CSS
Material UI (MUI)
Redux Toolkit
React Router
Backend
Node.js
Express.js
MongoDB Atlas
Mongoose
Other Tools
Axios (API handling)
Formik + Yup (forms & validation)
Postman (API testing)
Figma (UI/UX design)
📁 Folder Structure
Frontend (src/)
src/
  components/
  pages/
  features/
    auth/
    dashboard/
    scan/
    verification/
    tracker/
    reports/
  hooks/
  services/
  store/
  utils/
  styles/
Backend (backend/)
backend/
  controllers/
  routes/
  models/
  services/
  middleware/
  utils/
  config/


⚙️ Setup Instructions
Frontend
cd frontend
npm install
npm run dev
Backend
cd backend
npm install
npm run dev
Environment Variables

Create .env in backend:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000
🎯 Final Outcome

This project demonstrates:

Full-stack development skills
Clean architecture and modular design
Real-world problem solving
Scalable and production-ready structure
🚀 Future Scope
Real manufacturer API integration
AI-based product verification
Real-time tracking system
Advanced analytics dashboard
👤 Author
GitHub: [https://github.com/your-username](https://github.com/Devanshi-Vadiya)
LinkedIn: https://www.linkedin.com/in/devanshi-vadiya-66364b397/
⭐ Note

This project is built for academic and demonstration purposes, focusing on software-based solutions without IoT dependency.
