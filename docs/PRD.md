# TransitOps - Product Requirements Document (PRD)

## Project Overview

TransitOps is a Smart Transport Operations Platform designed to digitize and streamline fleet operations for logistics organizations. It replaces manual spreadsheets and paper-based workflows by providing a centralized platform for vehicle management, driver management, trip dispatching, maintenance tracking, fuel logging, expense management, and operational analytics.

---

# Objective

Build a centralized transport management platform that enables organizations to:

- Manage fleet vehicles
- Manage drivers
- Create and dispatch trips
- Track maintenance activities
- Record fuel consumption and operational expenses
- Generate reports and analytics
- Enforce transport business rules automatically

---

# Target Users

## Fleet Manager

- Manage vehicle registry
- Monitor fleet utilization
- Schedule and manage maintenance
- View dashboard analytics

## Dispatcher

- Create trips
- Assign vehicles and drivers
- Dispatch trips
- Complete or cancel trips

## Safety Officer

- Manage driver profiles
- Track driving license validity
- Monitor driver safety scores
- Prevent invalid driver assignments

## Financial Analyst

- Monitor fuel expenses
- Track maintenance costs
- Analyze operational cost
- View profitability and ROI reports

---

# Role Permissions

| Role | Permissions |
|------|-------------|
| Fleet Manager | Vehicles, Maintenance, Dashboard |
| Dispatcher | Trips, Dispatch, Completion |
| Safety Officer | Drivers, License Monitoring |
| Financial Analyst | Fuel Logs, Expenses, Reports |

---

# Core Features

## Authentication

- Secure Email & Password Login
- JWT Authentication
- Role-Based Access Control (RBAC)

---

## Dashboard

Displays:

- Active Vehicles
- Available Vehicles
- Vehicles In Maintenance
- Active Trips
- Pending Trips
- Drivers On Duty
- Fleet Utilization

Supports filtering by:

- Vehicle Type
- Vehicle Status
- Region

---

## Vehicle Registry

Manage vehicles including:

- Registration Number
- Vehicle Name
- Model
- Vehicle Type
- Region
- Maximum Load Capacity
- Odometer
- Acquisition Cost
- Status

Vehicle Status:

- Available
- On Trip
- In Shop
- Retired

---

## Driver Management

Manage drivers including:

- Name
- License Number
- License Category
- License Expiry Date
- Contact Number
- Safety Score
- Status

Driver Status:

- Available
- On Trip
- Off Duty
- Suspended

---

## Trip Management

Create and manage trips using:

- Source
- Destination
- Vehicle
- Driver
- Cargo Weight
- Planned Distance

Trip Lifecycle:

Draft

↓

Dispatched

↓

Completed

OR

Cancelled

---

## Maintenance Management

Create maintenance records for vehicles.

Maintenance automatically changes vehicle status to **In Shop** until maintenance is completed.

---

## Fuel Management

Record:

- Fuel Consumed
- Fuel Cost
- Date

---

## Expense Management

Track expenses such as:

- Fuel
- Maintenance
- Toll
- Repair
- Insurance
- Parking
- Other

---

## Reports & Analytics

Generate:

- Fleet Utilization
- Fuel Efficiency
- Operational Cost
- Vehicle ROI

Support CSV Export.

---

# Dashboard Metrics

- Active Vehicles
- Available Vehicles
- Vehicles In Maintenance
- Active Trips
- Pending Trips
- Drivers On Duty
- Fleet Utilization
- Fuel Efficiency
- Operational Cost
- Vehicle ROI

---

# Automated Workflows

Dispatch Trip

- Vehicle → On Trip
- Driver → On Trip

Complete Trip

- Vehicle → Available
- Driver → Available

Cancel Trip

- Vehicle → Available
- Driver → Available

Create Maintenance

- Vehicle → In Shop

Close Maintenance

- Vehicle → Available (unless retired)

---

# Business Rules

- Vehicle registration number must be unique.
- Driver license number must be unique.
- Retired vehicles cannot be dispatched.
- Vehicles under maintenance cannot be dispatched.
- Drivers with expired licenses cannot be assigned.
- Suspended drivers cannot be assigned.
- Vehicles already on a trip cannot be assigned again.
- Drivers already on a trip cannot be assigned again.
- Cargo weight must not exceed vehicle capacity.
- Automatic status transitions are enforced.

---

# Technology Stack

## Frontend

- React.js
- Tailwind CSS

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT

## Deployment

- MongoDB Atlas
- Render
- Vercel

---

# Future Enhancements

- PDF Export
- Email Notifications
- Vehicle Document Management
- Advanced Charts
- Search & Filters
- Dark Mode