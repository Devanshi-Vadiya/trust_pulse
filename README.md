# 🛡️ Consumer Trust Platform

<p align="center">
  <b>A unified platform to verify product safety, authenticity, and quality</b><br/>
  <i>Scan · Verify · Track · Trust</i>
</p>

<p align="center">
  <a href="https://trust-pulse-blue.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-trust--pulse--blue.vercel.app-blue?style=for-the-badge&logo=vercel" alt="Live Demo"/>
  </a>
  <a href="https://www.figma.com/design/YBDuWGLy6yqIYLaZHGoAnE/HW-7-8--minecraft-valo?node-id=2015-1786&t=wiNyJq0RSRw7qaG2-1">
    <img src="https://img.shields.io/badge/Design-Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma"/>
  </a>
  <a href="https://documenter.getpostman.com/view/50839376/2sBXqKofA8">
    <img src="https://img.shields.io/badge/API%20Docs-Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman"/>
  </a>
</p>

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Setup Instructions](#-setup-instructions)
- [Screenshots](#-screenshots)
- [Future Scope](#-future-scope)
- [Author](#-author)

---

## 🧠 Problem Statement

Consumers today face a significant **lack of transparency and trust** when purchasing everyday products:

| Issue | Challenge |
|-------|-----------|
| 🍬 Sugar Content | Grams are not intuitive — hard to understand real impact |
| 🍷 Alcohol Authenticity | No easy way to verify if a product is genuine |
| 💧 Water Purity | Uncertain purification status with no accessible data |
| 📦 Fragmented Tools | No unified system exists to validate overall product safety |

> Existing solutions are either fragmented or hardware-dependent, making them inaccessible to everyday consumers.

---

## 🚀 Solution

The **Consumer Trust Platform** provides a software-based, unified solution allowing users to:

- 🔍 **Scan** products using barcode or QR codes
- 🍬 **Track** sugar intake in intuitive units (teaspoons)
- 🍷 **Verify** alcohol product authenticity
- 💧 **Check** water purity and TDS levels
- 📢 **Report** unsafe or suspicious products

All features are integrated into a single, clean, and fully responsive web application — **no IoT hardware required**.

---

## ✨ Features

### 🔍 Product Scan System
- Global scan functionality across all modules
- Barcode & QR-based input support

### 🍬 Sugar Tracker
- Converts grams → teaspoons for intuitive understanding
- Tracks daily intake with visual progress indicators
- Shows percentage of recommended daily limit

### 🍷 Alcohol Verification
- Verifies product authenticity via batch & manufacturer details
- Detects and flags duplicate scans

### 💧 Water Verification
- Displays TDS (Total Dissolved Solids) levels
- Shows purification status and supplier trust score

### 📢 Complaint System
- Multi-step reporting form with file upload support
- User-friendly submission flow

### 🎨 UI/UX
- Fully responsive design (mobile + desktop)
- Light / Dark theme support
- Clean, accessible dashboard layout

---

## 🧱 Tech Stack

**Frontend**

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat-square&logo=mui&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white)

**Backend**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)

**Tools**

![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![Formik](https://img.shields.io/badge/Formik-172B4D?style=flat-square)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=flat-square&logo=postman&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white)

---

## 📁 Folder Structure

<details>
<summary><b>Frontend</b> (<code>src/</code>)</summary>

```
src/
├── components/
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── scan/
│   ├── verification/
│   ├── tracker/
│   └── reports/
├── pages/
├── hooks/
├── services/
├── store/
├── utils/
└── styles/
```
</details>

<details>
<summary><b>Backend</b> (<code>backend/</code>)</summary>

```
backend/
├── controllers/
├── routes/
├── models/
├── services/
├── middleware/
├── utils/
└── config/
```
</details>

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Devanshi-Vadiya/your-repo-name
cd your-repo-name
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Backend

```bash
cd backend
npm install
npm run dev
```

### 4. Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=5000
```

---

## 🎯 Key Highlights

- ✅ Scalable frontend architecture with Redux state management
- ✅ Clean REST API with documented endpoints
- ✅ Full-stack development — frontend to database
- ✅ Real-world problem solving without hardware dependency
- ✅ Production-ready project structure

---

## 🔭 Future Scope

- 🔌 Manufacturer API integrations for real-time data
- 🤖 AI-based product verification and anomaly detection
- 📡 Real-time tracking and alert systems
- 📊 Advanced analytics dashboard for consumption trends

---

## 👤 Author

**Devanshi Vadiya**

[![GitHub](https://img.shields.io/badge/GitHub-Devanshi--Vadiya-181717?style=flat-square&logo=github)](https://github.com/Devanshi-Vadiya)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-devanshi--vadiya-0077B5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/devanshi-vadiya-66364b397/)

---

## ⭐ Support

If you found this project helpful:

- Give it a ⭐ **star** on GitHub
- Share your **feedback** via issues
- **Connect** on LinkedIn

---

<p align="center">
  <i>Built with ❤️ as a software-first approach to consumer product safety</i>
</p>
