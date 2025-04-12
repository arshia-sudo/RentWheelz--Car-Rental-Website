import React, { useState, useEffect } from 'react';
import BookingModal from '../../components/BookingModal';
import '../../styles/Vehicle.css'; // Import CSS file for styling
import axios from 'axios';
import Button from '@/components/Button';
import { useAuth } from '../AuthContext';

const Vehicle = ({ vehicle, close }) => {
    const [isBookOpen, setIsBookOpen] = useState(false);
    const [reviews, setReviews] = useState([]);
    const { userId, jwtToken } = useAuth();

    const handleBooking = async () => {
        console.log('opening booking modal....')
        setIsBookOpen(true);
    };

    const fetchReviews = async (vehicleId) => {
        try{
            const response = await axios.get(`http://localhost:8081/api/reviews/vehicle/${vehicleId}`, {
                params: {
                    token: jwtToken,
                }
            });
            setReviews(response.data);
        }
        catch (error) { 
            console.error("Error fetching reviews:", error);
        }
    }

    useEffect(() => {
        if (vehicle && vehicle.id) {
            fetchReviews(vehicle.id);
        }
    }, [vehicle, jwtToken]);

    return (
        <div className="vehicle-page">
            {isBookOpen && <BookingModal onClose={() => setIsBookOpen(false)} userId={userId} vehicleId={vehicle.id} company={vehicle.companyName} model={vehicle.model}  />}
                <div className='vehicle-info'>                <img src={vehicle.imageUrl} alt={vehicle.model} className="vehicle-image" />
                <div className="vehicle-details">
                    <h2>{vehicle.companyName} {vehicle.model}</h2>
                    <p><strong>Type:</strong> {vehicle.type}</p>
                    <p><strong>Capacity:</strong> {vehicle.capacity}</p>
                    <p><strong>Price per Day:</strong> ${vehicle.pricePerDay}</p>
                    <p><strong>Manufacturing Year:</strong> {vehicle.manufacturingYear}</p>
                    <p><strong>Rating:</strong> {vehicle.rating}</p>
                    <p><strong>Number Plate:</strong> {vehicle.numberPlate}</p>
                    <button className="vehicle-btn" onClick={() => handleBooking(vehicle.id, vehicle.companyName, vehicle.model)}>Book</button>
                    <button className='vehicle-btn' onClick={()=>{close()}}>Go Back</button>
                </div>
                
                
                </div>
            {reviews.length > 0 ? (
                <>
                    <h3>Customer Reviews</h3>
                <div className="reviews-section">
                    {reviews.map(review => (
                        <div key={review.id} className="review">
                            <p><strong>Rating:</strong> {review.rating}</p>
                            <p><strong>Comment:</strong> {review.comment}</p>
                        </div>
                    ))}
                </div>
                </>
            ):(
                <h3>No reviews.</h3>
            )}
        </div>
    );
};

export default Vehicle;
