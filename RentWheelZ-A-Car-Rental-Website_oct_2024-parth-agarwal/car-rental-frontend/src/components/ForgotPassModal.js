// src/components/ForgotPassModal.js
import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import Button from './Button';
import ResetPassword from './ResetPassword';
import '../styles/modal.css';

const ForgotPassModal = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [result, setResult] = useState('');
    const [showResetModal, setShowResetModal] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setResult('');

        try {
            const response = await axios.post('http://localhost:8081/api/users/forgotpass', {
                email,
            });
            console.log('Response:', response.data);
            setResult('Token sent to your email!');
            setTimeout(() => {
                setShowResetModal(true);
            }, 2000);
        } catch (err) {
            setResult('Token sending failed.');
        }
    };

    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <button className="close-button" onClick={onClose}>×</button>
                    <h2>Forgot Password?</h2>
                    <form onSubmit={handleSubmit}>
                        <InputField
                            label="Email: "
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {result && <p className="result-message">{result}</p>}
                        <Button text="Submit" />
                    </form>
                </div>
            </div>
            {showResetModal && <ResetPassword onClose={() => {setShowResetModal(false);onClose();}} closeForgot={onClose}/>} {/* Show Reset Password modal */}
        </>
    );
};

export default ForgotPassModal;
