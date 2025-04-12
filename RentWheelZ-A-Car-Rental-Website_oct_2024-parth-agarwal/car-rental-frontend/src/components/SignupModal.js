// src/components/SignupModal.js
import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import Button from './Button';
import '../styles/modal.css';

const SignupModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const [result, setResult] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult('');

    if (password !== confirmPassword) {
      setResult('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/api/users/signup', {
        email,
        firstName,
        lastName,
        password,
        address,
        phoneNo,
      });
      setResult('Signup successful!');
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.error('Error during signup:', err.message);
      setResult('Signup failed. Please try again.');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content signup-modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="Enter your phone number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {result && <p className="result-message">{result}</p>}
          <Button text="Signup" />
        </form>
      </div>
    </div>
  );
};

export default SignupModal;

// src/components/CursorFollower.js

