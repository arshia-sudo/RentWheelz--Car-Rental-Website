// components/CursorFollower.js
import React, { useEffect, useState } from 'react';

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Update the position state whenever the mouse moves
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Add event listener for mouse move
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Style the cursor follower
  const followerStyle = {
    position: 'fixed',
    top: position.y,
    left: position.x,
    width: '40px',           // Increased size
    height: '40px',          // Increased size
    backgroundColor: 'rgb(255 255 255 / 10%)',  // More visible color
    borderRadius: '50%',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',  // Center the follower
    zIndex: 9999,           // Ensure it's on top of other elements
  };

  return <div style={followerStyle} />;
};

export default CursorFollower;
