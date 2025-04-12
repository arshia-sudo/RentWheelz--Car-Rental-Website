import React, { useState } from 'react';
import Button from './Button';
import { useAuth } from '../app/AuthContext'
import '../styles/modal.css';
import axios from 'axios';

const ReviewModal = ({ onClose, userId, vehicleId }) => {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [resultMessage, setResultMessage] = useState('');

    const {jwtToken} = useAuth();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Create the review object
        const review = {
            vehicleId,
            customerId: userId,
            comment,
            rating,
        };

        try {
            const response = await axios.post('http://localhost:8081/api/reviews', review, {
                headers: {
                    'Content-Type': 'application/json',
                },
                params: {
                    token: jwtToken,
                }
            });

            if (response) {
                setResultMessage('Review submitted successfully!');
                setTimeout(() => {
                    setResultMessage('');
                    onClose(); // Close the moda1
                }, 1000);
            } else {
                setResultMessage('Failed to submit review');
                setTimeout(() => {
                    setResultMessage('');
                }, 1000);
            }
        } catch (error) {
            setResultMessage('Failed to submit review');
            setTimeout(() => {
                setResultMessage('');
            }, 1000);
            console.error('Error submitting review:', error);
        }

        setTimeout(() => {
            onClose();
        }, 1000);
    };

    return (
        <div className="review-modal modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h1>Leave a Review</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Add Rating (1-5) :
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            required
                        />
                    </label>
                    <label>
                        Add a Comment :
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </label>
                    {resultMessage? <p>{resultMessage}</p> : null}
                    <Button text="Submit"/>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
