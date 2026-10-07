# CareKart — Web Application & Authentication System 🥗🍲

> **Final Year Engineering Capstone Project (2026-27)**  
> **Department:** Computer Science & Engineering (Data Science)  
> **Institution:** Swami Keshvanand Institute of Technology, Management & Gramothan (SKIT), Jaipur  
> **Project ID:** `SKIT/DS/2023-2027/02`  
> **SDG Mapping:** UN SDG 2 — **Zero Hunger**  
> **Mentor:** Mrs. Abha Jain (Assistant Professor-2, CSE)  
> **Coordinator:** Dr. Sumit Mathur  
> **Role:** Web Developer — Kartavya Vashisth  

---

## 📌 Project Overview
**CareKart** is a cross-platform food redistribution system designed to bridge the gap between food surplus generators (restaurants, hostel messes, banquet halls, event caterers) and people in need (NGOs, orphanages, community kitchens) by facilitating efficient, real-time donation management.

### Key Functional Requirements Implemented:
* **FR-001 (High Priority):** User authentication system allowing **Donors**, **Recipients (NGOs)**, and **Admins** to register, log in, and manage profiles securely.
* **NFR-002 (High Priority):** Security enforcement with strict **JSON Web Token (JWT)** based authentication.
* **NFR-004 (Medium Priority):** Usability — fully responsive UI across mobile, tablet, and desktop screens.

---

## 🛠️ Technology Stack (Web Module)
* **Library / Framework:** React 19 + Vite (Modern, high-performance web tooling)
* **Styling & UI:** Tailwind CSS v4 (Clean, responsive layout compliant with CareKart brand colors)
* **Routing:** React Router v7 (`react-router-dom`) with Protected Route Guards
* **API Client & Security:** Axios with JWT Bearer Token Request/Response Interceptors
* **Icons:** Lucide React
* **Backend Integration Target:** Spring Boot REST APIs (`http://localhost:8080/api`) with MongoDB

---

## 📂 Project Architecture & Directory Structure
```
carekart-web/
├── .env                  # Environment config (API base URL)
├── .env.example          # Template environment config
├── index.html            # Application entry HTML
├── package.json          # Node dependencies & build scripts
├── vite.config.js        # Vite + Tailwind build setup
└── src/
    ├── main.jsx          # React DOM root render
    ├── App.jsx           # Main routing & AuthProvider wrapper
    ├── index.css         # Tailwind base styles & global fonts
    ├── services/
    │   ├── api.js        # Axios instance + JWT header interceptor
    │   └── authService.js# Login, register, token management + Demo fallback
    ├── context/
    │   └── AuthContext.jsx # Global auth state (user, token, role, login, logout)
    ├── components/
    │   └── common/
    │       ├── Navbar.jsx        # Responsive navigation with role indicators
    │       ├── Footer.jsx        # Project credits & institutional details
    │       └── ProtectedRoute.jsx# Role-based route guard
    └── pages/
        ├── HomePage.jsx          # Public landing page with SDG 2 mission
        ├── LoginPage.jsx         # Login screen with Donor/Receiver/Admin tabs
        ├── RegisterPage.jsx      # Signup screen with role & location fields
        ├── DonorDashboard.jsx    # Donor portal (listings & impact stats)
        ├── ReceiverDashboard.jsx # Receiver/NGO portal (food claim feed)
        ├── AdminDashboard.jsx    # Admin analytics (FR-005)
        └── ProfilePage.jsx       # User profile details & session token viewer
```

---

## 🔐 How JWT Authentication Works (Step-by-Step)
1. **User Submission:** The user fills the Login/Register form with email and password.
2. **REST API Request:** `authService.login()` dispatches a POST request to `http://localhost:8080/api/auth/login`.
3. **Token Issuance:** The Spring Boot backend validates credentials and returns a signed JWT token containing user role and claims.
4. **Local Persistence:** The token is stored in browser `localStorage` as `carekart_token`.
5. **Axios Interceptor:** Every subsequent outgoing API call automatically attaches `Authorization: Bearer <token>`.
6. **Route Protection:** `ProtectedRoute` checks `AuthContext`. If unauthenticated, it redirects to `/login`. If the user's role does not match the page (e.g., a Donor attempting to open Admin settings), it safely redirects them.
7. **Offline Demo Mode:** If the Spring Boot backend is not currently running (e.g., during viva presentation or independent frontend testing), CareKart automatically activates a built-in Presentation Mode with simulated JWT tokens and 1-click test accounts.

---

## 🚀 How to Run the Application Locally

### 1. Prerequisites
Ensure Node.js (v18+) is installed. (Node.js LTS is configured on this system).

### 2. Start the Development Server
Open PowerShell in the project directory:
```powershell
cd C:\Users\karte\.gemini\antigravity\scratch\carekart-web
npm run dev
```

### 3. Open in Browser
Open `http://localhost:5173` in your web browser.

---

## 🧪 Demo Accounts for Viva / Project Presentation
For quick evaluation without manual typing, click the **"Viva / Demo Mode: Quick Auto-Fill"** buttons on the Login page:
* **Donor Account:** `donor@carekart.org` / `donor123`
* **Receiver / NGO Account:** `receiver@carekart.org` / `ngo123`
* **Admin Account:** `admin@carekart.org` / `admin123`

---

## 👥 CareKart Team Details
| Member Name | Role in Project | Key Responsibilities |
|---|---|---|
| **Harsh** | Android Developer | Kotlin, Jetpack Compose, Mobile UI & Testing |
| **Harshit Goyal** | AI & ML Developer | Python, Scikit-learn, Random Forest Expiry Model |
| **Karan Garg** | Backend Developer | Spring Boot, REST APIs, MongoDB Database Schema |
| **Kartavya Vashisth** | Web Developer | React.js, Responsive UI, Web Setup & JWT Authentication |
