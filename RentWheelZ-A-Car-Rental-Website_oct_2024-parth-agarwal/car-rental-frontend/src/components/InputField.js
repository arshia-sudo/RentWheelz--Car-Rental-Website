// src/components/InputField.js
import React from 'react';

const InputField = ({ label, type, placeholder, value, onChange }) => {
    return (
        <div className="input-field">
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange} 
                required
            />
        </div>
    );
};

export default InputField;
