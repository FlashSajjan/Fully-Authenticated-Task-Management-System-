MERN Stack Todo Application

A full-stack task management system built using the MERN stack with secure authentication and Role-Based Access Control (RBAC). The application enables users to manage personal todos while providing administrators with system-wide oversight and control.

1. Project Overview

Full-stack MERN application

Secure JWT-based authentication

Role-based authorization (User / Admin)

User-specific todo management

Admin dashboard for monitoring users and todos

Production-ready architecture

2. Tech Stack
Backend

Node.js
 – JavaScript runtime

Express.js
 – REST API framework

MongoDB
 – NoSQL database

Mongoose
 – MongoDB ODM

JWT (JSON Web Token)
 – Authentication

bcryptjs
 – Password hashing

Frontend

React 19
 – UI library

Vite
 – Build tool

React Router v6
 – Client-side routing

Axios
 – HTTP client

Tailwind CSS
 – Styling framework

3. Core Features
3.1 Authentication System

User registration

User login

JWT token-based authentication

Password hashing with bcrypt (10 salt rounds)

Protected API routes

Role-based access control (RBAC)

3.2 Todo Management

Full CRUD operations:

Create todo

Read todos

Update todo

Delete todo

Todo attributes:

Title

Description

Category (Urgent / Non-Urgent)

Due Date

Completion status

User-specific todo isolation

Category classification

3.3 Admin Dashboard

View all users

View all todos (system-wide)

Promote users to admin

Monitor user activity

4. API Endpoints
4.1 Authentication Routes
POST   /api/auth/register      → Register new user
POST   /api/auth/login         → Login user
4.2 Todo Routes (Protected)
GET     /api/todos             → Get logged-in user todos
POST    /api/todos             → Create new todo
GET     /api/todos/:id         → Get specific todo
PUT     /api/todos/:id         → Update todo
DELETE  /api/todos/:id         → Delete todo
4.3 Admin Routes (Admin Only)
GET     /api/admin/todos               → View all todos
GET     /api/admin/users               → View all users
PATCH   /api/admin/users/:id/role      → Update user role

5. Database Models
5.1 User Schema

username

email

password (hashed)

role (user / admin)

timestamps

5.2 Todo Schema

title

description

dueDate

category

completed (Boolean)

user (ObjectId reference)

timestamps

6. Security Implementation

JWT stateless authentication

Password hashing using bcrypt (10 salt rounds)

Authentication middleware

Role-based authorization middleware

CORS enabled

User-specific data protection

7. Key Accomplishments

Complete authentication flow using JWT

RESTful API design

Role-based access control

Responsive UI with Tailwind CSS

Protected frontend and backend routes

Modular and scalable architecture

Reusable component library

Global state management using Context API
