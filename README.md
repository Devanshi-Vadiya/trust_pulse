# 🛡️ Consumer Trust Platform (Frontend)

A unified web application designed to help consumers verify the **safety, authenticity, and quality** of everyday products such as packaged foods, alcohol, and drinking water.

---

## 🚀 Overview

In today’s digital commerce environment, consumers often lack trust in the products they purchase due to limited transparency. This platform provides a **single interface** where users can scan and verify products using software-based solutions.

The application focuses on:

* Product verification
* Health awareness (sugar tracking)
* Transparency through data visualization
* Clean and accessible UI/UX

---

## 🎯 Features

### 🔍 Product Scanning System

* Simulated QR / barcode scanning
* Central entry point for verification
* Modular scan flows

### 🍬 Sugar Tracker

* Converts sugar (grams → teaspoons)
* Daily intake tracking
* Visual progress (charts, indicators)
* Detects high sugar consumption

### 🍷 Alcohol Verification

* Verifies authenticity using codes
* Displays product status:

  * Genuine
  * Suspicious
  * Already used
* Shows batch and manufacturer info

### 💧 Water Purity Verification

* Displays purification data
* Shows TDS levels
* Certificate-style UI for trust
* Supplier trust score

### 📢 Complaint & Reporting

* Multi-step form
* File upload support (image proof)
* User-friendly submission flow

---

## ⚠️ Constraints

* Purely **software-based implementation**
* No IoT or hardware dependency
* Uses:

  * QR / barcode inputs
  * Mock APIs / backend-ready structure
  * Rule-based verification logic

---

## 🧱 Tech Stack

* **React (Vite)**
* **Tailwind CSS**
* **Material UI (MUI)**
* **Redux Toolkit**
* **React Router**
* **Formik + Yup**
* **Axios**
* **Recharts / Chart.js**

---

## 📁 Project Structure

```
src/
  components/
  pages/
  features/
    auth/
    product/
    scan/
    reports/
  hooks/
  services/
  utils/
  store/
```

---

## 🎨 Figma Design

Explore the complete UI/UX design and prototype here:

👉 https://www.figma.com/design/YBDuWGLy6yqIYLaZHGoAnE/HW-7-8--minecraft-valo?node-id=2014-3&m=dev&t=fQ0yk5UzXoIFx2dL-1

---

## 📌 Footer

Built with ❤️ as part of a full-stack frontend engineering project.

Designed to demonstrate:

* Scalable architecture
* Clean UI/UX principles
* Real-world problem solving

© 2026 Consumer Trust Platform | Academic Project
