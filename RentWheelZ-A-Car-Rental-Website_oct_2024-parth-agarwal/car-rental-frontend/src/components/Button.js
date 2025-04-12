// src/components/Button.js

import '../styles/button.css';

export default function Button({ text, onClick }) {
  return <button className="custom-button" type="submit" onClick={onClick}>{text}</button>;
}
