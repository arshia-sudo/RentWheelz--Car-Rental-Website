
// src/components/ProfileModal.js
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import '../styles/modal.css';
import InputField from './InputField';
import Button from './Button';
import { useAuth } from '../app/AuthContext';
import axios from 'axios';
import ReviewModal from './ReviewModal';

const ProfileModal = ({ onClose, className, setIsVehiclesOpen }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [email, setEmail] = useState(''); 
    const [editMode, setEditMode] = useState(false);

    const { jwtToken, userId, logout } = useAuth(); // Getting jwtToken and logout from useAuth

    const customerId = userId; 

    const [bookings, setBookings] = useState([]);

    const [reviewOpen, setReviewOpen] = useState(false);
    const [vehicleId, setVehicleId] = useState(null);


    const today = new Date().toLocaleDateString();

useEffect(() => {
    const fetchBookings = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/api/bookings/customer/${customerId}`,{
                params: { token: jwtToken } // Send token as a query parameter
            });
            console.log('Bookings of this user:', response.data);

            // Fetch vehicle names for each booking
            const bookingsWithNames = await Promise.all(response.data.map(async (booking) => {
                const vehicleName = await fetchVehicleName(booking.vehicleId); // Assuming booking has vehicleId
                return { ...booking, vehicleName }; // Combine booking details with vehicle name
            }));

            setBookings(bookingsWithNames);

        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    fetchBookings();
}, [customerId]);

const fetchVehicleName = async (vehicleId) => {
    // Fetch vehicle details for each booking
    const vehicleResponse = await axios.get(`http://localhost:8081/api/vehicles/vehicle`, {
        params: { 
            vehicleId: vehicleId ,
            token: jwtToken
        }
    });
    console.log('Vehicle details:', vehicleResponse.data);
    return vehicleResponse.data.companyName + ' ' + vehicleResponse.data.model;
};




    // Fetch user profile data on component mount
        const fetchUserProfile = async (userId, jwtToken) => {
            try {
                const response = await axios.get(`http://localhost:8081/api/users/${userId}`, {
                    params: {
                        token: jwtToken // Send JWT as a query parameter
                    }
                });
                const userData = response.data;
                console.log('User data:', userData);
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setEmail(userData.email);
                setAddress(userData.address);
                setPhoneNo(userData.phoneNo);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };        
        
    useEffect(() => {
        
        if (jwtToken) {
            fetchUserProfile(userId, jwtToken);
        }
    }, [jwtToken]);

    // Handle profile save/update
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = {
                firstName,
                lastName,
                address,
                phoneNo
            };
            await axios.put(`http://localhost:8081/api/users/${userId}`, updatedUser, {
                params: {
                    token: jwtToken // Send token as a query parameter
                }
            });
            console.log('Profile updated:', updatedUser);
            setTimeout(()=>{
                setEditMode(false);
                console.log('disabled edit mode');
            }, 1000);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };


    // Handle profile deletion
    const handleDeleteAccount = async () => {
        try {
            await axios.delete(`http://localhost:8081/api/users/${userId}`, {
                params: {
                    token: jwtToken // Send token as a query parameter
                }
            }); // Send token as a query parameter
            logout(); // Log the user out after deleting the account
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    const handleBookingCancellation = async (bookingId) => {
        try {
            await axios.delete(`http://localhost:8081/api/bookings/delete/${bookingId}`, {
                params: {
                    token: jwtToken // Send token as a query parameter
                }
            });
            console.log('Booking cancelled:', bookingId);
            const updatedBookings = bookings.filter((booking) => booking.id !== bookingId);
            setBookings(updatedBookings);
        } catch (error) {
            console.error('Error cancelling booking:', error);
        }
    }


    return (
        <div className={`profmodal profile-modal ${className}`}>
            <div className="profmodal-content profile-modal-content">
                <button className="prof-close-button" onClick={onClose}>×</button>
                <h1>Profile</h1>
                {editMode ? (
                    <form onSubmit={handleSave}>
                        <Image
                            src="/assets/profileIcon.png" // Use the root-relative path
                            alt="Profile Icon" // Provide a descriptive alt text
                            width={100} // Set the desired width
                            height={100} // Set the desired height
                            className="profile-icon" // Add a custom class name
                        />
                        <InputField
                            label="First Name: "
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <InputField
                            label="Last Name: "
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <InputField
                            label="Address: "
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <InputField
                            label="Phone No: "
                            type="text"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                        />
                        <Button text="Save" type ="Submit" />
                    </form>
                ) : (
                    <div className="profile-info">
                        <Image
                            src="/assets/profileIcon.png"
                            alt="Profile Icon"
                            width={100}
                            height={100}
                            className="profile-icon"
                        />
                        <p><strong>First Name:</strong> {firstName}</p>
                        <p><strong>Last Name:</strong> {lastName}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Address:</strong> {address}</p>
                        <p><strong>Phone No:</strong> {phoneNo}</p>
                        <Button text="Edit Profile" onClick={() => setEditMode(true)} />
                        <Button text="Delete Account" onClick={handleDeleteAccount} />
                        <Button text="Logout" onClick={() => {
                            console.log('clicked Log out button');
                            setIsVehiclesOpen(false); // Close the vehicles page
                            logout(); // Trigger logout from AuthContext
                            onClose();
                        }} />
                    </div>
                )}
                <br/><br/>

                {reviewOpen && (<ReviewModal vehicleId={vehicleId} onClose={() => setReviewOpen(false)} userId={userId}/>)}

                <br/><br/>
                <h1>My Bookings</h1>
                <div className="booking-info">
                    {bookings.length === 0 ? (
                        <p>No bookings made yet.</p>
                    ) : (
                        bookings.map((booking) => (
                            <div key={booking.id} className="booking-details">
                                <h3>
                                    {booking.vehicleName}: {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString() } 
                                </h3>
                                <div className="booking-buttons">
                                    
                                {today === new Date(booking.endDate).toLocaleDateString() &&
                                    <button className="reviewBtn" onClick={() => {setReviewOpen(true); setVehicleId(booking.vehicleId);} } >Review</button>}
                                    
                                    <button className="cancelBookingBtn" onClick={() => {handleBookingCancellation(booking.id)} } >Cancel</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
