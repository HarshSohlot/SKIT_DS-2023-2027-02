# CareKart — Zero Hunger Food Redistribution Platform (Web & AI Modules) 🥗🍲

> **Final Year Engineering Capstone Project (2026-27)**  
> **Institution:** Swami Keshvanand Institute of Technology, Management & Gramothan (SKIT), Jaipur  
> **Department:** Computer Science & Engineering (Data Science)  
> **Project ID:** `SKIT/DS/2023-2027/02`  
> **SDG Mapping:** UN SDG 2 — **Zero Hunger**  
> **Mentor:** Mrs. Abha Jain (Assistant Professor-2, CSE)  
> **Coordinator:** Dr. Sumit Mathur  

---

## 📌 Project Overview
**CareKart** is a cross-platform food redistribution system designed to bridge the gap between food surplus generators (restaurants, hostel messes, banquet halls, event caterers) and people in need (NGOs, orphanages, community kitchens) by facilitating efficient, real-time donation management backed by intelligent food expiry prediction.

---

# PART 1: Web Application & Authentication Module (`carekart-web`)
> **Developer:** Kartavya Vashisth (Web Developer)

### Key Functional Requirements Implemented:
* **FR-001 (High Priority):** User authentication system allowing **Donors**, **Recipients (NGOs)**, and **Admins** to register, log in, and manage profiles securely.
* **NFR-002 (High Priority):** Security enforcement with strict **JSON Web Token (JWT)** based authentication.
* **NFR-004 (Medium Priority):** Usability — fully responsive UI across mobile, tablet, and desktop screens.

### Technology Stack (Web Module)
* **Library / Framework:** React 19 + Vite
* **Styling & UI:** Tailwind CSS v4
* **Routing:** React Router v7 (`react-router-dom`) with Protected Route Guards
* **API Client & Security:** Axios with JWT Bearer Token Request/Response Interceptors
* **Icons:** Lucide React

### How to Run the Web Application Locally
1. Ensure Node.js (v18+) is installed.
2. Open PowerShell in the project directory:
   ```powershell
   cd carekart-web
   npm run dev
   