
RentWheelZ: A Car Rental Platform
By Arshia Chandarki

Abstract
RentWheelZ is a web-based car rental application built using Bubble.io for the frontend and Spring Boot for the backend. It offers users a seamless way to browse, book, and manage vehicle rentals. Key features include user authentication, vehicle listings, vehicle search, profile management ,  rental bookings and cancellations and email notifications.

Introduction
Modern users demand convenience and efficiency, especially in accessing services online. RentWheelZ meets these expectations by providing a platform where users can:
List all Vehicles, Search for vehicles, filter the vehicles.
Book rentals based on availability.
Manage user profiles and bookings.
Key Focus:
User-friendly interface.
Quick and secure bookings.
Transparent pricing and real-time availability.
Architecture and Design
Overview
The system is divided into below layers:
Presentation Layer: Handles the user interface and user interactions in Bubble.io front end 
Pages include landing, login, signup, vehicle listing, profile management, booking
Business Logic Layer: Contains the core functionality and business rules in  Spring Boot backend
Handles business logic, data storage, and API communication.
Performs CRUD operations for users, vehicles, bookings and reviews.
Database : Manages data storage and retrieval in H2 database.

Component Structure
Components interact through RESTful APIs. The frontend sends requests to the backend, which processes the data and interacts with the database.
Frontend Components
Landing Page: User onboarding 
Vehicle List: Displays available vehicles with search and filter options.
Profile Management: Enables user updates and booking tracking.
Booking Management: View, cancel, and rate vehicles.
Backend Modules
Models: Representations of Users, Vehicles, Reviews, and Bookings.
Repositories: Interfaces for database interaction.
Controllers: REST APIs and logic for client interaction.
Interaction Flow
Workflow in Bubble.io
User Interface: Created pages for login, sign up, vehicle listings, booking , and user profiles.
API Calls: Set up API calls in Bubble to fetch vehicle data from the Spring Boot backend.
Conditional Logic: Used Bubble’s “Only when” conditions to handle form validation and booking logic.
Workflow in Spring Boot
Controller: Create RESTful endpoints for login, sign up, vehicle listings and bookings.
Service: Implement business logic for booking management 
Repository: Define data access methods for interacting with the database.
  User Action
The user initiates actions like login or vehicle search or booking a vehicle.
  API Request
The frontend communicates with the backend by sending an HTTP request.
  Backend Processing
The backend verifies the input, performs required operations, and updates the database as needed.
  API Response
The backend returns the processed response, enabling the frontend to dynamically refresh the user interface.

Email Notification
The Service sends an email when the user booking is confirmed or password is reset

Requirements
Functional Requirements
User Authentication and Management 
Secure login,signup  and password reset features.
Car Search and filter
Search and filter vehicles.
Car Rental bookings
Car booking for vehicles selected
User Profile
Update personal details.
View active bookings.
Cancel bookings and add reviews
Non-Functional Requirements
Performance 
Fast responses with optimized backend operations.
Scalability 
Support growing user base and future feature expansions.
Security 
Encrypted communications (HTTPS).
Reliability 
Ensure consistent email notifications.
Maintainability 
Modular code for easy debugging and enhancements.

Technical Stack
Frontend
Bubble.io (no code platform) : A no-code platform for building the frontend user interface, offering drag-and-drop functionality and visual design tools.
Backend
Framework: Spring Boot for Java-based backend services.  The foundation of backend, handling business logic, database interactions, and REST APIs.
Database: H2 database. 
Deployment
Ngrok : A tool to expose your local Spring Boot server to the internet, allowing Bubble.io to interact with it.
Tools and Platforms
Version Control: Git and GitHub.
Development Tools: Spring Tool Suite4, VS Code,  Ngrok

Development Details
Project Setup and Backend Development:
Create Spring Boot Project: Use Spring Initializr to create a project with necessary dependencies (e.g., Spring Web, Spring Data JPA, H2 Database).
Design Database Schema: Define entities like Vehicle, Customer, Booking, Review and their relationships.
Implement REST Controllers: Create controllers to handle API endpoints for vehicle listing, user authentication, booking management, etc.
Implement Business Logic: Write services to handle the underlying logic for your operations.
Frontend Development with Bubble.io:
Design UI: Create visually appealing pages for car listings, user profiles, booking forms, etc.
Connect to Backend: Use Bubble.io's API connector to integrate with Spring Boot REST APIs.
Implement User Flows: Build logic for user interactions like searching for vehicle, booking, search,  login, signup and profile updates.
Integration and Deployment:
Configure ngrok: Expose local Spring Boot server to the internet using ngrok.
Integrate with Bubble.io: Connect Bubble.io app to the ngrok URL for backend.


User Guide
Login and Sign-Up 
Sign up with the required form details
Login using user id and password.
Browsing Vehicles 
Search and filter vehicles from the "Vehicles" page.
Booking a Vehicle 
Select dates and confirm bookings.
Managing Bookings 
View bookings on the "Profile" page.
API Reference
Bookings API
Get Booking by ID
Endpoint: GET /getBooking/{id}
Description: Fetches a booking by its ID.
Response: Return Booking object
Create Booking
Endpoint: POST /createBooking
Description: Creates a new booking and sends a confirmation email.
Request Body: Booking object
Response: return true or false
Delete or Cancel Booking
Endpoint: POST /deleteBooking/{id}
Description: Delete a booking .
Response: return true or false
Update Booking
Endpoint: POST /updateBooking
Description: Update a booking  details
Request Body:  Booking object
Response: return true or false

Get All Bookings
Endpoint: GET /getAllBookings
Description: Fetches all bookings.
Response: List of Booking objects

Get Bookings by User
Endpoint: GET /getBookingsForUser/{userId}
Description: Fetches all bookings made by a specific user.
Response: List of Booking objects

Reviews API
Get Reviews by Booking ID
Endpoint: GET /getReviewByID/{bookingId}
Description: Fetches reviews associated with a specific booking.
Response: List of Review objects
Get Reviews by Vehicle ID
Endpoint: GET /getReviewByVehicleID/{vehicleId}
Description: Fetches reviews for a specific vehicle.
Response: List of Review objects

Get Reviews by User
Endpoint: GET /getReviewsForUser/{userId}
Description: Fetches reviews written by a specific user.
Response: List of Review objects

Add Review
Endpoint: POST /createReview
Description: Adds a new review.
Request Body: Review object
Response: return true or false

Update Review
Endpoint: POST /updateReview
Description: Updates an existing review.
Request Body: Updated Review object
Response: return true or false
Delete Review
Endpoint: POST /deleteReview/{id}
Description: Deletes a review.
Response: return true or false

User or Customer API
Sign Up 
Endpoint: POST /signUp
Description: Sign up the user
Response: return true or falce
Request Body : User details

Login 
Endpoint: POST /login
Description: login the user
Response: Customer object
Request Body : User Id and password 

Logout 
Endpoint: POST /logout
Description: logout the user
Response: return true or false
Request Body :  Customer ID

Reset the password 
Endpoint: POST /resetPassword
Description: Reset the password for  the user
Response: return the Customer Object
Request Body :  Customer ID

Update Profile
Endpoint: POST /updateProfile
Description: Updates the authenticated user's profile.
Request Body: Customer object
Response: Return true or false

Delete Profile
Endpoint: POST /deleteProfile
Description: Deletes the authenticated user's profile.
Response: Return true or false
Request Parameter: customer ID
Get the user Profile
Endpoint: GET /getUser
Description: Get  the user's profile.
Response: Return Customer Object
Request Parameter: customer ID
Vehicles API
Get All Vehicles
Endpoint: GET /getAllVehicles
Description: Fetches all vehicles 
Response: List of Vehicle objects


Get Vehicle by ID
Endpoint: GET /getVehicle/{vehicleId}
Description: Fetches details of a vehicle by its ID.
Response: Vehicle object
Filter Vehicles By Type
Endpoint: GET /filterVehiclesByType
Description: Fetches all vehicles by selected type
Response: List of Vehicle objects
Search by Company name and ModelType
Endpoint: GET /searchByCompanynameModelType
Description: Fetches all vehicles by selected compnay name and type
Response: List of Vehicle objects

Challenges
Integration: Ensuring seamless communication between Bubble.io and Spring Boot.
Security: Implementing secure authentication

Conclusion
RentWheelZ is a user-friendly, feature-rich platform for vehicle rentals. With its robust architecture and future-proof design, it is well-suited for real-world deployment and future scalability.
Appendices:
API Documentation
Database Schema Design
References
For understanding Spring boot:
https://spring.io/projects/spring-boot
https://www.youtube.com/watch?v=35EQXmHKZYs
For understanding Bubble.io:
https://www.youtube.com/watch?v=PuQz1w80ddw



