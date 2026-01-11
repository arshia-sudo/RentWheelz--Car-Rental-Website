# RentWheelZ – Car Rental Platform

RentWheelZ is a web-based car rental application that allows users to browse, search, book, and manage vehicle rentals efficiently.  
The platform is built using **Bubble.io** for the frontend and **Spring Boot** for the backend.

---

## Table of Contents
- Overview
- Features
- System Architecture
- Technology Stack
- Application Workflow
- Functional Requirements
- Non-Functional Requirements
- API Reference
- User Guide
- Development & Deployment
- Challenges
- Conclusion
- References

---

## Overview
RentWheelZ provides a seamless and user-friendly platform for renting vehicles online.  
Users can search for vehicles, check availability, make bookings, manage profiles, and receive email notifications.

---

## Features
- User authentication (Signup, Login, Password Reset)
- Vehicle listing with search and filter options
- Real-time booking and cancellation
- User profile and booking management
- Vehicle reviews and ratings
- Email notifications for booking confirmation and password reset

---

## System Architecture

### Architecture Layers
1. **Presentation Layer**
   - Built using Bubble.io
   - Handles UI and user interactions
   - Pages include landing, login, signup, vehicle listing, booking, and profile management

2. **Business Logic Layer**
   - Developed using Spring Boot
   - Handles business rules and REST APIs
   - Performs CRUD operations for users, vehicles, bookings, and reviews

3. **Database Layer**
   - H2 Database for data storage and retrieval

---

## Component Structure

### Frontend Components
- Landing Page – User onboarding
- Vehicle Listing – Browse, search, and filter vehicles
- Booking Management – Book, view, and cancel rentals
- Profile Management – Update profile and view bookings

### Backend Modules
- Models – User, Vehicle, Booking, Review
- Repositories – Database interaction
- Controllers – REST APIs
- Services – Business logic implementation

---

## Technology Stack

### Frontend
- Bubble.io (No-code platform)

### Backend
- Spring Boot
- Spring Data JPA
- H2 Database

### Tools
- Git & GitHub
- Spring Tool Suite 4
- VS Code
- Ngrok

---

## Application Workflow
1. User performs an action (login, search, booking)
2. Bubble.io sends an API request to Spring Boot
3. Backend validates input and processes business logic
4. Database is updated if required
5. Backend returns response to frontend
6. UI updates dynamically
7. Email notification is sent when applicable

---

## Functional Requirements
- Secure user authentication and profile management
- Vehicle search and filtering
- Booking creation, update, and cancellation
- Review and rating system
- Email notifications

---

## Non-Functional Requirements
- **Performance:** Fast API responses  
- **Scalability:** Supports future feature expansion  
- **Security:** HTTPS communication  
- **Reliability:** Consistent email delivery  
- **Maintainability:** Modular and clean codebase  

---

## API Reference

### Bookings API

| Endpoint | Method | Description |
|--------|--------|------------|
| `/getBooking/{id}` | GET | Fetch booking by ID |
| `/createBooking` | POST | Create a new booking |
| `/deleteBooking/{id}` | POST | Cancel a booking |
| `/updateBooking` | POST | Update booking details |
| `/getAllBookings` | GET | Fetch all bookings |
| `/getBookingsForUser/{userId}` | GET | Fetch bookings by user |

---

### Reviews API

| Endpoint | Method | Description |
|--------|--------|------------|
| `/getReviewByID/{bookingId}` | GET | Get reviews by booking |
| `/getReviewByVehicleID/{vehicleId}` | GET | Get reviews by vehicle |
| `/getReviewsForUser/{userId}` | GET | Get reviews by user |
| `/createReview` | POST | Add a review |
| `/updateReview` | POST | Update review |
| `/deleteReview/{id}` | POST | Delete review |

---

### User / Customer API

| Endpoint | Method | Description |
|--------|--------|------------|
| `/signUp` | POST | Register new user |
| `/login` | POST | User login |
| `/logout` | POST | User logout |
| `/resetPassword` | POST | Reset password |
| `/updateProfile` | POST | Update user profile |
| `/deleteProfile` | POST | Delete profile |
| `/getUser` | GET | Get user profile |

---

### Vehicles API

| Endpoint | Method | Description |
|--------|--------|------------|
| `/getAllVehicles` | GET | Fetch all vehicles |
| `/getVehicle/{vehicleId}` | GET | Get vehicle by ID |
| `/filterVehiclesByType` | GET | Filter vehicles by type |
| `/searchByCompanynameModelType` | GET | Search vehicles |

---

## User Guide

### Login & Signup
- Register using required details
- Login using user ID and password

### Browse Vehicles
- View available vehicles
- Search and filter based on preferences

### Booking
- Select vehicle and rental dates
- Confirm booking

### Manage Bookings
- View active bookings
- Cancel bookings
- Add reviews

---

## Development & Deployment

### Backend
1. Create Spring Boot project using Spring Initializr
2. Add dependencies (Spring Web, JPA, H2)
3. Design database schema
4. Implement REST APIs and services

### Frontend
1. Design UI pages in Bubble.io
2. Connect backend using API Connector
3. Implement workflows and validations

### Deployment
- Use Ngrok to expose local Spring Boot server
- Connect Bubble.io to Ngrok endpoint

---

## Challenges
- Seamless integration between Bubble.io and Spring Boot
- Implementing secure authentication

---

## Conclusion
RentWheelZ is a scalable and user-friendly car rental platform suitable for real-world applications.  
Its modular architecture allows easy future enhancements.

---

## References
- Spring Boot: https://spring.io/projects/spring-boot  
- Spring Boot Tutorial: https://www.youtube.com/watch?v=35EQXmHKZYs  
- Bubble.io Tutorial: https://www.youtube.com/watch?v=PuQz1w80ddw  
