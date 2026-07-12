# Software Architecture Document (SAD)

# TransitOps – Smart Transport Operations Platform

---

# 1. Overview

TransitOps is a full-stack web application developed using the MERN stack to digitize transport operations. The application enables organizations to efficiently manage vehicles, drivers, trips, maintenance activities, fuel logs, operational expenses, dashboards, and reports while enforcing business rules through a modular backend architecture.

The project follows a layered architecture that separates presentation, business logic, routing, and data access, making the application scalable, maintainable, and easy to extend.

---

# 2. Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend

- Node.js
- Express.js
- JWT Authentication
- Bcrypt.js
- Mongoose

## Database

- MongoDB Atlas

---

# 3. Software Architecture

```
+------------------------------------------------+
|                 React Frontend                 |
|------------------------------------------------|
| Pages | Components | API | Context | Routing   |
+------------------------+-----------------------+
                         |
                    REST API (HTTP)
                         |
+------------------------v-----------------------+
|                Express Backend                 |
|------------------------------------------------|
| Routes → Controllers → Models → MongoDB Atlas |
| Middleware | Config | Utilities               |
+------------------------+-----------------------+
                         |
                    Mongoose ODM
                         |
+------------------------v-----------------------+
|                 MongoDB Atlas                  |
+------------------------------------------------+
```

---

# 4. Project Directory Structure

```
TransitOps/

├── frontend/
│
│   ├── public/
│
│   ├── src/
│   │
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── hooks/
│   ├── routes/
│   ├── utils/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── backend/
│
│   ├── src/
│   │
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   │
│   ├── app.js
│   └── server.js
│
├── docs/
│
└── README.md
```

---

# 5. Frontend Architecture

The frontend is developed using React and Vite with reusable UI components.

## API Layer

Handles communication with backend REST APIs.

Files include:

- auth.js
- vehicles.js
- drivers.js
- trips.js
- maintenance.js
- fuelExpense.js
- reports.js

---

## Components

Reusable UI components organized into:

- Layout Components
- UI Components
- Form Components

---

## Pages

Application screens include:

- Login
- Signup
- Dashboard
- Vehicles
- Drivers
- Trips
- Maintenance
- Fuel & Expense
- Reports

---

## Context

Maintains global application state, including authenticated user information.

---

## Routes

Manages client-side navigation and protected routes.

---

## Utilities

Contains reusable helper functions used throughout the frontend.

---

# 6. Backend Architecture

The backend follows a layered architecture.

## Config

Responsible for:

- Database Connection
- Environment Configuration

Files

- db.js
- env.js

---

## Controllers

Controllers receive HTTP requests, invoke business logic, and return API responses.

Controllers include:

- Authentication
- Vehicle
- Driver
- Trip
- Maintenance
- Fuel Log
- Expense
- Dashboard
- Reports

---

## Models

MongoDB collections represented using Mongoose schemas.

Collections include:

- Roles
- Users
- Vehicles
- Drivers
- Trips
- MaintenanceLogs
- FuelLogs
- Expenses

---

## Routes

Defines REST API endpoints and maps them to corresponding controllers.

---

## Middleware

Responsible for:

- JWT Authentication
- Role-Based Authorization (RBAC)
- Global Error Handling
- File Upload Processing

---

## Utilities

Contains reusable helper functions including:

- JWT Token Generation
- Application Constants
- Request Validators
- CSV Export
- PDF Export
- Email Service
- Standard API Responses

---

# 7. Request Flow

```
Client

↓

Routes

↓

Controllers

↓

Models

↓

MongoDB

↓

Response

↓

Frontend
```

---

# 8. Authentication Flow

1. User submits email and password.
2. Backend validates credentials.
3. JWT token is generated.
4. Token is returned to the frontend.
5. Frontend stores the token.
6. Protected routes verify JWT before processing requests.
7. RBAC middleware validates user permissions.

---

# 9. Business Modules

The application consists of the following modules:

- Authentication
- Dashboard
- Vehicle Registry
- Driver Management
- Trip Management
- Maintenance Management
- Fuel Log Management
- Expense Management
- Reports & Analytics

---

# 10. Security

The application implements:

- JWT Authentication
- Password Hashing (bcrypt)
- Protected REST APIs
- Role-Based Access Control (RBAC)
- Input Validation
- Environment Variable Configuration

---

# 11. Scalability

The modular folder structure allows future enhancements such as:

- Charts & Visual Analytics
- PDF Report Export
- Email Notifications
- Vehicle Document Management
- GPS Tracking
- Real-time Notifications
- Dark Mode

---

# 12. Design Principles

- Modular Architecture
- Layered Design Pattern
- Separation of Concerns
- RESTful API Design
- Reusable Components
- Secure Authentication
- Scalable MongoDB Schema
- Maintainable Codebase