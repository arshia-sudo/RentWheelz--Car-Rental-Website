// src/components/ResetPassword.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from './InputField';
import Button from './Button';
import '../styles/modal.css';

const ResetPassword = ({ onClose, closeForgot }) => {
    const [resetToken, setResetToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [result, setResult] = useState('');
    const [timeLeft, setTimeLeft] = useState(180);
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    onClose();
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onClose]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setResult('');

        try {
            const response = await axios.post('http://localhost:8081/api/users/resetpass', {
                resetToken,
                newPassword,
            });
            console.log('Response:', response.data);
            setResult('Password has been reset successfully!');
            setTimeout(() => {
                closeForgot();
                onClose();
            }, 1200);
        } catch (err) {
            setResult('Failed to reset password. Invalid or expired token.');
        }
    };

    const formatTimeLeft = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>Reset Password</h2>
                <p>Time left: {formatTimeLeft(timeLeft)}</p>
                <form onSubmit={handleResetPassword}>
                    <InputField
                        label="Reset Token: "
                        type="text"
                        placeholder="Enter your reset token"
                        value={resetToken}
                        onChange={(e) => setResetToken(e.target.value)}
                    />
                    <InputField
                        label="New Password: "
                        type="password"
                        placeholder="Enter your new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {result && <p className="result-message">{result}</p>}
                    <Button text="Reset Password" />
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
