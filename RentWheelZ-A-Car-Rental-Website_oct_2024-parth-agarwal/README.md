## RentWheelZ is a Car Rental Website made with Next.js and Springboot. 


### [Current Status: Milestone 3 Completed.]

### Features Implemented: 
- Dynamic Landing Page with sleek animations
- Smooth User flow from Signup to login
- Forgot Password functionality with a 24/7 email service
- Profile Page with Dynamic Data Fetching and Updation
- Delete Account with a single click
- See available Vehicles
- Searching and Filtering
- Book a vehicle using Dynamic Calendar without worry of overlaps
- Seamlessly View the bookings in profile page
- View other user's reviews and ratings 
- Add reviews on your bookings
- Cancel Bookings
- Booking/Cancellation confirmation through email
- jwt validation for all sensitive apis

### Future updates:
- Admin dashboard for adding vehicles and analytics
- Payment Gateway Integration
- Deployment and testing


### Run it on your machine:


Brevo is an email service whose API key can be generated [here](https://www.brevo.com/).

To use the app, clone it to your local machine and enter your brevo API key in *application.properties*:
```properties
    brevo.api.key=*ENTER_BREVO_API_KEY_HERE*
```


Then, open a terminal and run the following commands:

```bash
    cd car-rental-frontend
    npm install
    npm run dev
```

The frontend app will be running on http://localhost:3000

Then, open another terminal and run the following commands to start the backend server:

```bash
    cd car-rental-backend
    mvn clean install
    mvn spring-boot:run

```


# Enjoy the app! 🚗
