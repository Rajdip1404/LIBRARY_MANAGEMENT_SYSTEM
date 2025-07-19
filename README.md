# 📚 Library Management System

A full-featured **Library Management System** built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). Designed for **Admin**, **Librarian**, and **User** roles with RESTful APIs, JWT authentication, role-based access, notifications, fine calculation, and more.

---

## 🛠️ Features

- **User roles**: Admin, Librarian, User with fine-grained access control
  
- **Authentication & Security**: JWT-based secure authentication
  
- **Email workflows**: Nodemailer-powered:
    - Signup confirmation
    - Forgot/reset password
    - Welcome email
      
- **Auto‑notifications**: Scheduled tasks using `node-cron`
    
- **Book management**:
    - CRUD operations (Add, Update, Delete, Record, View) by Admin/Librarian
    - Upload cover images via Cloudinary
    - Filtering and advanced search: by title, author, category

- **User management**: Only Admin can manage users (add, roles, etc.)
    
- **Borrow/return workflow**:
    - Users request books
    - Librarians/Admin approve
    - Tracking returned and overdue books
    - Automated fine calculation for overdue books

- **Dashboards**:
    - Admin & Librarian UIs with charts for interactive insights
    - User dashboard to view available, borrowed, returned, non-returned books

- **Notifications & Emails** for various stages (verification, reset, success, etc.)

---

## 📁 Folder Structure

```bash
LIBRARY_MANAGEMENT_SYSTEM/
├── client/
│   ├── src/
│   │   ├── assets/                        # Static files (images, logos, etc.)
│   │   ├── components/                    # Core UI components
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── BookManagement.jsx
│   │   │   ├── Catalog.jsx
│   │   │   ├── LibrarianDashboard.jsx
│   │   │   ├── MyBorrowedBooks.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   └── Users.jsx
│   │   ├── layout/                        # Layout components like sidebar/header
│   │   │   ├── Header.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/                         # Authentication & routing pages
│   │   │   ├── EmailVerification.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── popups/                        # All modals/popups
│   │   │   ├── AddBookPopup.jsx
│   │   │   ├── AddNewAdmin.jsx
│   │   │   ├── AddNewLibrarian.jsx
│   │   │   ├── BorrowBookPopup.jsx
│   │   │   ├── DeleteBookPopup.jsx
│   │   │   ├── ReadBookPopup.jsx
│   │   │   ├── RecordBookPopup.jsx
│   │   │   ├── ReturnBookPopup.jsx
│   │   │   ├── SettingPopup.jsx
│   │   │   └── UpdateBookPopup.jsx
│   │   ├── store/                         # Redux store configuration
│   │   │   ├── slices/                    # Slices for state (auth, books, etc.)
│   │   │   └── store.js
│   │   ├── App.jsx                        # Root component
│   │   ├── index.css                      # Global styles
│   │   └── main.jsx                       # ReactDOM entry point
│   └── package.json                       # Frontend dependencies
│
├── server/
│   ├── controllers/                       # Route handler logic
│   │   ├── auth.controller.js
│   │   ├── book.controller.js
│   │   ├── borrow.controller.js
│   │   └── user.controller.js
│   ├── db/
│   │   └── db.js                          # MongoDB connection setup
│   ├── middlewares/                      # Auth & error middleware
│   │   ├── auth.middleware.js
│   │   ├── catchAsyncErrors.middleware.js
│   │   └── error.middleware.js
│   ├── models/                            # Mongoose schemas
│   │   ├── book.model.js
│   │   ├── borrow.model.js
│   │   └── user.model.js
│   ├── routes/                            # Express route definitions
│   │   ├── auth.router.js
│   │   ├── book.router.js
│   │   ├── borrow.router.js
│   │   └── user.router.js
│   ├── services/                          # External services
│   │   ├── emails.service.js              # Sending mail
│   │   └── notifyUser.service.js          # Notifications, reminders
│   ├── utils/                             # Helpers and utilities
│   │   ├── email.config.js                # Nodemailer config
│   │   ├── emailTemplates.js              # HTML email templates
│   │   └── fineCalculator.js              # Overdue fine logic
│   ├── .env                               # Actual env file (excluded from Git)
│   ├── sample.env                         # Sample .env for setup
│   ├── app.js                             # Main Express app config
│   ├── server.js                          # Server entry point
│   ├── package.json                       # Backend dependencies
│   └── package-lock.json
│
├── README.md                              # Project documentation
└── .gitignore
```

---

## 🚀 Installation & Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/Rajdip1404/LIBRARY_MANAGEMENT_SYSTEM.git
cd LIBRARY_MANAGEMENT_SYSTEM
```

### 2. Setup server

```bash
cd server
cp sample.env .env
# Edit .env to add your own values:
#   MONGODB_URI=...
#   JWT_SECRET=...
#   CLOUDINARY_CLOUD_NAME=...
#   CLOUDINARY_API_KEY=...
#   CLOUDINARY_API_SECRET=...
#   EMAIL_HOST=...
#   EMAIL_PORT=...
#   EMAIL_USER=...
#   EMAIL_PASS=...
npm install
npm run dev  # or npm start
```

### 3. Setup client

```bash
cd ../client
npm install
npm start
```

The React application should open at `http://localhost:3000` and backend server at `http://localhost:5000` (or as configured).

---

## 🧩 Usage

- Visit the **login** or **signup** page
    
- After verifying email, you’ll receive a welcome mail
    
- Admin can add **librarians** and **users**
    
- Admin & Librarian can manage books and view interactive charts
    
- Users can browse & request books
    
- Automatic email notifications and fines for overdue return happen via scheduled tasks
    

---

## ⚙️ Tech Stack

- **Frontend**: React.js + Charting library
    
- **Backend**: Node.js, Express.js (REST API)
    
- **Database**: MongoDB
    
- **Auth**: JWT
    
- **Email**: Nodemailer
    
- **Scheduling**: node‑cron
    
- **File Uploads**: Cloudinary
    
- **Visualization**: Charts in React
    

---

## ✉️ Email Templates / Screenshots

- **Signup Page** – New users can register themselves into the system.

![signup_page](https://github.com/Rajdip1404/LIBRARY_MANAGEMENT_SYSTEM/blob/fb152eed45a5f077a00bf5b43125218914308553/images/signup.png)

---

- **Email Verification Template** – After signup a email has been sent to the user to verify that email

![email-verification-mail](https://github.com/Rajdip1404/LIBRARY_MANAGEMENT_SYSTEM/blob/fb152eed45a5f077a00bf5b43125218914308553/images/email-verification-mail.png)

---

- **Admin Dashboard** – An interactive admin dashboard with charts

![signup_page](https://github.com/Rajdip1404/LIBRARY_MANAGEMENT_SYSTEM/blob/fb152eed45a5f077a00bf5b43125218914308553/images/admin-dashboard.png)

---

📷 View full screenshots [Click here](Screenshots.md)

---

## 📄 Sample `.env` file

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=you@example.com
EMAIL_PASS=your_email_password
```

---

## 📝 Based on README best practices

Structure inspired by standard README templates outlining project, installation, usage, folder structure and tech stack ([drupal.org](https://www.drupal.org/docs/develop/managing-a-drupalorg-theme-module-or-distribution-project/documenting-your-project/readmemd-template?utm_source=chatgpt.com "README.md template | Documenting your project - Drupal"), [medium.com](https://medium.com/%40galanipriyanshu/building-a-library-management-system-with-mern-stack-a-case-study-of-the-summer-internship-project-07ec0c300d0f?utm_source=chatgpt.com "Building a Library Management System with MERN Stack - Medium"), [cs.purdue.edu](https://www.cs.purdue.edu/homes/roopsha/papers/semcluster_draft.pdf?utm_source=chatgpt.com "[PDF] SemCluster: Clustering of Programming Assignments based on ..."), [github.com](https://github.com/topics/library-management-system?utm_source=chatgpt.com "library-management-system · GitHub Topics"), [arxiv.org](https://www.arxiv.org/list/cs.CV/2024-02?show=2000&skip=700&utm_source=chatgpt.com "Computer Vision and Pattern Recognition Feb 2024 - arXiv")).

---

Let me know if you'd like any additional sections (e.g. testing, contributors, license), or adjustments for tone (e.g. more concise). Once you're ready, I’ll provide the final ready-to-drop‑into `README.md`.