import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingCalendar from './BookingCalendar';
import Button from './Button';
import '../styles/modal.css';
import { useAuth } from '../app/AuthContext';

const BookingModal = ({ onClose, userId, vehicleId, company, model }) => {
    const [result, setResult] = useState('Click on start date, click on end date, Book!');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const { jwtToken } = useAuth();
    const [disabledDates, setDisabledDates] = useState([]);
    const [showPaymentOptions, setShowPaymentOptions] = useState(false); // New state to toggle payment options

    useEffect(() => {
        const fetchDisabledDates = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/api/bookings/unavailable-dates/${vehicleId}`, {
                    params: { token: jwtToken },
                });
                setDisabledDates(response.data);
            } catch (error) {
                console.error('Error fetching disabled dates:', error);
            }
        };
        fetchDisabledDates();
    }, [vehicleId]);

    const handleSelectDates = ({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const handleProceedToPayment = () => {
        if (!startDate || !endDate) {
            setResult('Click on start date, click on end date, Book!');
            return;
        }
        
        setResult('Click on the preferred payment option and confirm!');
        setShowPaymentOptions(true); // Show payment options
    };

    const handleConfirmBooking = async () => {
        setResult('Booking...');
        
        const booking = {
            customerId: userId,
            vehicleId,
            startDate,
            endDate,
        };

        try {
            const response = await axios.post('http://localhost:8081/api/bookings/create', booking, {
                params: { token: jwtToken },
            });
            console.log('Booking successful:', response.data);
            setResult('Booking successful!');
            setTimeout(() => {
                setResult('Click on start date, click on end date, Book!');
                onClose();
            }, 1000);
        } catch (err) {
            setResult('Booking failed. Please try again.');
            setTimeout(() => {
                setResult('Click on start date, click on end date, Book!');
            }, 3000);
        }
    };
    return (
        <div className="modal booking-modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h1>Book a {company} {model}</h1>
                
                {/* Show calendar only if payment options are not visible */}
                {!showPaymentOptions && (
                   <>
                   <BookingCalendar disabledDates={disabledDates} onSelectDates={handleSelectDates} />
                    {result && <p className="result-message">{result}</p>}
                    <Button text="Proceed to Payment" onClick={handleProceedToPayment} />
                   </>
                )}
                
                {/* Payment options and confirm button */}
                {showPaymentOptions && (
                    <div className = "payment-window">
                        <h2>Select Payment Method</h2>
                        <div className="payment-options">
                            <label><input type="radio" name="payment" /> UPI</label>
                            <label><input type="radio" name="payment" /> Debit Card</label>
                            <label><input type="radio" name="payment" /> Credit Card</label>
                            <label><input type="radio" name="payment" /> Net Banking</label>
                        </div>
                        {result && <p className="result-message">{result}</p>}
                        <Button text="Confirm Booking" onClick={handleConfirmBooking} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingModal;
