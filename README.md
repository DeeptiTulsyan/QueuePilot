# 🚀 QueuePilot – Smart Queue Management System

🌐 **Live Demo:** https://queue-pilot.vercel.app  

QueuePilot is a full-stack queue management system that allows users to join queues remotely and track their position in real time, eliminating physical waiting lines.

The system replaces traditional queues with a virtual token-based system, improving efficiency for environments like hospitals, service centers, and cafes.

---

## 💡 About the Project

This project is now a fully deployed full-stack application with a React frontend and Node.js backend.

It demonstrates real-world concepts such as authentication, API integration, deployment, and debugging production-level issues.

---

## 🎨 Frontend

- Built using React (Vite)
- Axios used for API communication
- Environment-based API configuration using Vite
- Responsive UI for better user experience
- Deployed on Vercel

---

## ⚙️ Backend

- Built using Node.js + Express
- MongoDB Atlas used as the cloud database
- Data models implemented using Mongoose
- Modular backend structure:
  - Models
  - Controllers
  - Routes
- CORS enabled for frontend integration
- Deployed on Render

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Authentication
- JWT (JSON Web Tokens)
- bcrypt

### Deployment
- Frontend: Vercel  
- Backend: Render  

---

## 🏗️ Architecture

- Frontend and backend are deployed separately
- Frontend communicates with backend via REST APIs
- Environment variables used for dynamic API configuration
- Backend hosted on Render with MongoDB Atlas integration

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- Secure password hashing using bcrypt
- JWT-based authentication
- Role support for user and admin

### 📊 Queue Management
- Users can join a queue and receive a token
- Token numbers generated sequentially (A-1, A-2, etc.)
- View queue status including:
  - Token number
  - People ahead
  - Estimated waiting time

---

## 📡 API Endpoints

### Authentication

**Register**  
`POST /api/auth/register`

```json
{
  "name": "Deepti",
  "email": "deepti@email.com",
  "password": "123456",
  "role": "user"
}

Login
POST /api/auth/login

{
  "email": "deepti@email.com",
  "password": "123456"
}
Queue

Join Queue
POST /api/queue/join

{
  "userId": "USER_OBJECT_ID"
}

Get Queue Status
GET /api/queue/status/:userId

{
  "tokenNumber": "A-5",
  "status": "WAITING",
  "peopleAhead": 2,
  "estimatedWait": 10
}
🔄 How the Queue Works
A user joins the queue
The system generates a unique token number
Tokens are stored in the database
Queue position is calculated dynamically based on:
Tokens ahead
Token status
Estimated wait time is calculated automatically
Example Queue:
Token	Status
A-1	COMPLETED
A-2	NOW_SERVING
A-3	WAITING
A-4	WAITING

If a user has A-4:

People ahead = 1
Estimated wait = 5 minutes
📁 Project Structure
queuepilot
│
├── queuepilot-client   # Frontend (React)
├── queuepilot-server   # Backend (Node.js)
│
├── server
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   └── server.js
⚡ Challenges Faced
Handling environment variables in Vite
Debugging deployment issues (Render + Vercel)
Fixing API routing errors (/api duplication)
Managing frontend-backend integration
🚀 Future Enhancements
Frontend
Admin dashboard
Improved UI/UX
Real-time queue updates
Backend
WebSocket integration for live updates
Queue analytics dashboard
DevOps
Docker containerization
CI/CD pipeline setup
🎯 Learning Outcomes

This project helped in understanding:

Full-stack application development
REST API design and integration
Authentication and authorization
Debugging real-world deployment issues
Working with cloud databases (MongoDB Atlas)
Deploying applications using Render and Vercel
👩‍💻 Author

Deepti Tulsyan

🌟 Show your support

If you like this project, consider giving it a ⭐ on GitHub!
