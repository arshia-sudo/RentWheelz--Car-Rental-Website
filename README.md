🚗 RentWheelZ – Car Rental Platform

RentWheelZ is a web-based car rental application that enables users to browse, search, book, and manage vehicle rentals seamlessly.
The platform uses Bubble.io for the frontend and Spring Boot for the backend, providing a scalable, user-friendly, and efficient rental experience.

📌 Table of Contents

Overview

Key Features

System Architecture

Technology Stack

Application Workflow

Functional Requirements

Non-Functional Requirements

API Reference

User Guide

Development & Deployment

Challenges

Conclusion

References

📖 Overview

RentWheelZ provides an online platform for renting vehicles with real-time availability, secure bookings, and profile management.
It allows users to search vehicles, make bookings, manage rentals, and receive email notifications for important actions.

✨ Key Features

User authentication (Login, Signup, Password Reset)

Vehicle listing with search and filter options

Real-time booking and cancellation

User profile and booking management

Vehicle reviews and ratings

Email notifications for booking confirmation and password reset

🏗️ System Architecture
Architecture Overview

The application follows a three-layer architecture:

Presentation Layer

Built using Bubble.io

Handles UI, navigation, and user interactions

Pages include landing, login, signup, vehicle listing, booking, and profile management

Business Logic Layer

Developed using Spring Boot

Handles business rules, validations, and REST APIs

Performs CRUD operations for users, vehicles, bookings, and reviews

Database Layer

H2 Database

Manages data storage and retrieval

🧩 Component Structure
Frontend Components

Landing Page – User onboarding

Vehicle Listing Page – Browse, search, and filter vehicles

Booking Management – Book, view, cancel rentals

Profile Management – Update profile and view bookings

Backend Modules

Models – User, Vehicle, Booking, Review

Repositories – Database access layer

Controllers – RESTful APIs for frontend communication

Services – Business logic implementation

⚙️ Technology Stack
Frontend

Bubble.io – No-code platform for UI development

Backend

Spring Boot – RESTful backend services

Spring Data JPA – Database interaction

H2 Database – In-memory database

Tools & Platforms

Git & GitHub – Version control

Spring Tool Suite 4 – Backend development

VS Code – Frontend and documentation

Ngrok – Exposing local backend to Bubble.io

🔄 Application Workflow

User Action

Login, search vehicle, or book a car

API Request

Bubble.io sends HTTP requests to Spring Boot backend

Backend Processing

Validation, business logic execution, database operations

API Response

Backend sends response to frontend

UI updates dynamically

Email Notification

Sent on booking confirmation or password reset

✅ Functional Requirements

Secure user authentication and profile management

Vehicle search and filtering

Booking creation, cancellation, and updates

Review and rating system

Email notifications

🔐 Non-Functional Requirements

Performance – Fast API responses

Scalability – Supports future feature expansion

Security – HTTPS communication

Reliability – Consistent email delivery

Maintainability – Modular and clean codebase

🔗 API Reference
📦 Bookings API
Endpoint	Method	Description
/getBooking/{id}	GET	Fetch booking by ID
/createBooking	POST	Create a new booking
/deleteBooking/{id}	POST	Cancel a booking
/updateBooking	POST	Update booking details
/getAllBookings	GET	Fetch all bookings
/getBookingsForUser/{userId}	GET	Fetch bookings by user
⭐ Reviews API
Endpoint	Method	Description
/getReviewByID/{bookingId}	GET	Get reviews by booking
/getReviewByVehicleID/{vehicleId}	GET	Get reviews by vehicle
/getReviewsForUser/{userId}	GET	Get reviews by user
/createReview	POST	Add a review
/updateReview	POST	Update review
/deleteReview/{id}	POST	Delete review
👤 User / Customer API
Endpoint	Method	Description
/signUp	POST	Register new user
/login	POST	User login
/logout	POST	User logout
/resetPassword	POST	Reset password
/updateProfile	POST	Update user profile
/deleteProfile	POST	Delete profile
/getUser	GET	Get user profile
🚘 Vehicles API
Endpoint	Method	Description
/getAllVehicles	GET	Fetch all vehicles
/getVehicle/{vehicleId}	GET	Get vehicle by ID
/filterVehiclesByType	GET	Filter vehicles by type
/searchByCompanynameModelType	GET	Search vehicles
🧑‍💻 User Guide
Login & Signup

Register using required details

Login using user ID and password

Browse Vehicles

View available vehicles

Search and filter based on preferences

Booking

Select vehicle and rental dates

Confirm booking

Manage Bookings

View active bookings

Cancel bookings

Add reviews

🚀 Development & Deployment
Backend Setup

Create Spring Boot project using Spring Initializr

Add dependencies (Spring Web, JPA, H2)

Design database schema

Implement REST APIs and business logic

Frontend Setup

Design UI pages in Bubble.io

Use API Connector to integrate backend

Implement workflows for user actions

Deployment

Use Ngrok to expose local Spring Boot server

Connect Bubble.io to Ngrok endpoint

⚠️ Challenges

Seamless integration between Bubble.io and Spring Boot

Implementing secure authentication mechanisms

🏁 Conclusion

RentWheelZ is a scalable, secure, and user-centric car rental platform designed for real-world applications. Its modular architecture allows easy enhancements and future growth.

📚 References

Spring Boot Documentation: https://spring.io/projects/spring-boot

Spring Boot Tutorial: https://www.youtube.com/watch?v=35EQXmHKZYs

Bubble.io Tutorial: https://www.youtube.com/watch?v=PuQz1w80ddw
