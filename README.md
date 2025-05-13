# MERN Stack Task Tracker App

This is a Task Tracker application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to manage projects and tasks with features such as creating, updating, deleting tasks, and viewing task details. The app includes user authentication using JWT, a responsive UI built with React and Bootstrap, and protected routes for secure access to specific pages.

## Features

-   **User Authentication**: Login and Register functionality with JWT-based authentication.
-   **Projects Management**: Create and manage projects with task lists.
-   **Tasks Management**: Add, update, delete, and view tasks for each project.
-   **Protected Routes**: Only authenticated users can access specific routes.
-   **Responsive Design**: Optimized for desktop and mobile devices.
-   **Navbar for Mobile Devices**: Collapsible navbar with a hamburger menu using React Icons.

## Tech Stack

-   **Frontend**: React.js, React Router, Bootstrap, React Icons
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB
-   **Authentication**: JWT (JSON Web Token)
-   **CSS**: Custom styling with Bootstrap

## Installation

### Prerequisites

Make sure you have the following installed:

-   [Node.js](https://nodejs.org/) (LTS version recommended)
-   [MongoDB](https://www.mongodb.com/) or a MongoDB Atlas account
-   [Git](https://git-scm.com/)

### Clone the repository

```bash
git clone [https://github.com/saitejamandadi99/mern-task-tracker.git](https://github.com/saitejamandadi99/mern-task-tracker.git)
cd mern-task-tracker

cd backend
npm install

cd frontend
npm install
```
Create a .env file in the backend directory and add the following:

PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key

Backend Server start

```bash
cd backend
npm start
```
Frontend Server start
```bash
cd frontend
npm start
```

Customization:
Make sure to replace https://github.com/your-username/mern-task-tracker.git with the actual GitHub URL of your repository.
Add any additional details specific to your project.


