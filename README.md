QueuePilot – Smart Queue Management System

QueuePilot is a full-stack queue management system designed to reduce waiting times by allowing users to join queues remotely and track their position in real time.

The system replaces physical waiting lines with a virtual token-based queue, improving efficiency for environments like hospitals, service centers, or cafes.

This repository currently contains the backend implementation built using Node.js, Express, and MongoDB Atlas.

Features Implemented
Authentication System

User registration and login

Secure password hashing using bcrypt

JWT-based authentication

Role support for user and admin

Queue Management

Users can join a queue and receive a token

Token numbers generated sequentially (A-1, A-2, etc.)

Queue status API calculates:

token number

people ahead

estimated waiting time

Backend Architecture

Built using Node.js + Express

MongoDB Atlas used as the cloud database

Data models implemented using Mongoose

Modular backend structure:

Models

Controllers

Routes

CORS middleware enabled for frontend integration

Tech Stack
Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

JWT Authentication

bcrypt (password hashing)

CORS

Tools

Postman (API testing)

Nodemon (development)

Project Structure
server
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   └── queueController.js
│
├── models
│   ├── User.js
│   └── Token.js
│
├── routes
│   ├── authRoutes.js
│   └── queueRoutes.js
│
├── server.js
└── .env
API Endpoints
Authentication
Register
POST /api/auth/register

Body example:

{
  "name": "Deepti",
  "email": "deepti@email.com",
  "password": "123456",
  "role": "user"
}
Login
POST /api/auth/login

Body example:

{
  "email": "deepti@email.com",
  "password": "123456"
}
Queue
Join Queue
POST /api/queue/join

Body example:

{
  "userId": "USER_OBJECT_ID"
}
Get Queue Status
GET /api/queue/status/:userId

Example response:

{
  "tokenNumber": "A-5",
  "status": "WAITING",
  "peopleAhead": 2,
  "estimatedWait": 10
}
How the Queue Works

A user joins the queue.

The system generates a unique token number.

Tokens are stored in the database.

Queue position is calculated dynamically based on:

tokens ahead

token status

Estimated wait time is calculated automatically.

Example queue:

Token	Status
A-1	COMPLETED
A-2	NOW_SERVING
A-3	WAITING
A-4	WAITING

If a user has A-4:

peopleAhead = 1
estimatedWait = 5 minutes
Environment Setup
1. Clone Repository
git clone https://github.com/yourusername/queuepilot.git
cd queuepilot
2. Install Dependencies
npm install
3. Configure Environment Variables

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
4. Start Development Server
npm run dev

Server will run on:

http://localhost:5000
Future Enhancements

Planned improvements include:

Frontend

React-based user dashboard

Admin dashboard

Real-time queue updates

Architecture

Microservices architecture

Event-driven queue updates

Redis caching

Message queues

DevOps & Deployment

Docker containerization

Kubernetes orchestration

Cloud deployment (AWS / GCP / Azure)

System Improvements

Multi-organization support

WebSocket real-time updates

Queue analytics dashboard

Load balancing and scaling

Learning Goals of This Project

This project is designed to explore:

Full-stack system design

REST API development

Authentication & authorization

Queue algorithms

Cloud database integration

Scalable backend architecture