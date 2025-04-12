// src/components/LoginModal.js
import React, { useState } from 'react';
import axios from 'axios';
import InputField from './InputField';
import Button from './Button';
import '../styles/modal.css';
import ForgotPassModal from "@/components/ForgotPassModal";
import { useAuth } from '../app/AuthContext';  // Import the context

const LoginModal = ({ onClose}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [isForgotpassOpen, setIsForgotpassOpen] = useState(false);
  const { login } = useAuth();  




  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult('');  

    try {
      const response = await axios.post('http://localhost:8081/api/users/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data.first, '  ', response.data.second);
      setResult('Login successful!');

      const jwtToken = response.data.first;  // Assuming 'first' is the token
      const userId = response.data.second;
      
      login(jwtToken, userId);  // Log the user in

      setTimeout(() => {
        setResult('');
        onClose();
      }, 1000);
    } catch (err) {
      setResult('Login failed. Please check your credentials.');
      
      setTimeout(() => {
        setResult('');
      }, 3000);
    }
  };

  return (

    <div className="modal login-modal">

      {isForgotpassOpen && <ForgotPassModal onClose={() => setIsForgotpassOpen(false)} />}
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {result && <p className="result-message">{result}</p>}
          <Button text="Login" />
        </form>

        <div className = "login-modal-buttons">
        <button className={"custom-button"} onClick={() => {
          console.log("forgot password clicked");
          setIsForgotpassOpen(true)
        }} >Forgot Password</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

