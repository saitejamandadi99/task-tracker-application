# 🧠 Task Tracker (MERN Stack)

A powerful and modern **Task Tracker Application** built using the **MERN stack** (MongoDB, Express, React, Node.js).

This project enables users to efficiently manage multiple projects and their tasks — all in one place. With **JWT-based authentication**, **protected routes**, and a **mobile-responsive UI**, it's designed for seamless productivity and real-world usage.

---

## 🚀 Live Demo

* 🔗 Frontend: [https://task-tracker-application-frontend-n7kj.onrender.com](https://task-tracker-application-frontend-n7kj.onrender.com)
* 🔗 Backend: [https://task-tracker-application-backend-oxez.onrender.com](https://task-tracker-application-backend-oxez.onrender.com)

---

## 🧩 Features

### ✅ Authentication

* Secure **JWT-based login/register** system
* Token stored in `localStorage` for protected access

### 📁 Project & Task Management

* **Create up to 4 projects per user**
* Inside each project, **add unlimited tasks**
* Each task includes:

  * Title
  * Description
  * Due Date
  * Priority (Low / Medium / High)
  * Status (Pending / In Progress / Completed)

### ✏️ Task Editing

* Edit or delete any task
* Easily **update task status** (from pending to completed)

### 🔐 Protected Routes

* Only authenticated users can access dashboard, projects, and task management pages

### 📱 Responsive UI

* Mobile-first design with collapsible **navbar** using React Icons
* Clean, modern interface styled with **Bootstrap 5**

---

## 🛠 Tech Stack

### 🔷 Frontend

* React.js
* React Router v7
* React Icons
* Bootstrap 5
* Axios

### 🔶 Backend

* Node.js
* Express.js
* MongoDB (Mongoose ODM)
* JWT for auth
* CORS for secure API usage

---

## 📦 Installation & Setup

### ⚙️ Prerequisites

* Node.js (LTS recommended)
* MongoDB (local or Atlas)
* Git

### 🔽 Clone the Repository

```bash
git clone https://github.com/saitejamandadi99/task-tracker-application.git
cd task-tracker-application
```

### 📁 Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with the following:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
```

Run the backend server:

```bash
npm start
```

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 📌 Project Structure

```
task-tracker-application/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── .env
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── index.js
└── README.md
```

---

## ✨ Future Enhancements

* Role-based access (e.g. admin vs user)
* Email notifications for due tasks
* Drag & drop task ordering
* Realtime updates with sockets

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you’d like to change.

---

## 📜 License

MIT

---

> Built with ❤️ by [@saitejamandadi99](https://github.com/saitejamandadi99)
