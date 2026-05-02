🛡️ Consumer Trust Platform
<p align="center"> <b>A unified platform to verify product safety, authenticity, and quality</b><br/> <i>Scan • Verify • Track • Trust</i> </p>
🔗 Important Links
Resource	Link
🎨 Figma Design	https://www.figma.com/design/YBDuWGLy6yqIYLaZHGoAnE/HW-7-8--minecraft-valo?node-id=2015-1786&t=wiNyJq0RSRw7qaG2-1

🌐 Live Project	https://trust-pulse-blue.vercel.app/

📬 Postman API Docs	https://documenter.getpostman.com/view/50839376/2sBXqKofA8

🎥 YouTube Demo	https://your-youtube-link.com
🧠 Problem Statement

Consumers today face a lack of transparency and trust when purchasing everyday products.

🍬 Sugar content is difficult to understand (grams are not intuitive)
🍷 Alcohol authenticity cannot be verified easily
💧 Water purity is uncertain
📦 No unified system exists to validate product safety

👉 Existing solutions are fragmented or hardware-dependent.

🚀 Solution

The Consumer Trust Platform provides a software-based unified solution that allows users to:

🔍 Scan products using barcode/QR
🍬 Track sugar intake in understandable units (teaspoons)
🍷 Verify alcohol authenticity
💧 Check water purity
📢 Report unsafe or suspicious products

All features are integrated into a single, clean, and accessible web application.

✨ Features
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
Detects duplicate scans
Displays batch and manufacturer details
💧 Water Verification
Displays TDS levels
Shows purification status
Supplier trust scoring
📢 Complaint System
Multi-step reporting form
File upload support
User-friendly submission flow
🎨 UI/UX
Fully responsive design
Light/Dark theme support
Clean dashboard layout
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
Tools
Axios
Formik + Yup
Postman
Figma
📁 Folder Structure
📦 Frontend (src/)
src/
  components/
  features/
    auth/
    dashboard/
    scan/
    verification/
    tracker/
    reports/
  pages/
  hooks/
  services/
  store/
  utils/
  styles/
⚙️ Backend (backend/)
backend/
  controllers/
  routes/
  models/
  services/
  middleware/
  utils/
  config/
🖼️ Screenshots

Add your screenshots here for better evaluation

📊 Dashboard

🔍 Scan Feature

🍬 Sugar Tracker

🍷 Alcohol Verification

💧 Water Verification

⚙️ Setup Instructions
📥 Clone Repository
git clone https://github.com/your-username/your-repo-name
cd your-repo-name
💻 Frontend
cd frontend
npm install
npm run dev
⚙️ Backend
cd backend
npm install
npm run dev
🔐 Environment Variables

Create a .env file inside backend:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000
🎯 Final Outcome

This project demonstrates:

✅ Scalable frontend architecture
✅ Clean API integration
✅ Full-stack development skills
✅ Real-world problem solving
✅ Production-ready structure
🚀 Future Scope
Manufacturer API integrations
AI-based product verification
Real-time tracking systems
Advanced analytics dashboard
👤 Author
GitHub: https://github.com/your-username
LinkedIn: https://linkedin.com/in/your-profile
⭐ Support

If you found this project useful:

👉 Star ⭐ the repository
👉 Share feedback
👉 Connect with me

📌 Note

This project is purely software-based and avoids IoT dependency to ensure scalability and accessibility.
