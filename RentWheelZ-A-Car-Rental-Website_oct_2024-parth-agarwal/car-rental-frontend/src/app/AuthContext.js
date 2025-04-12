
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create context
const AuthContext = createContext();

// Provider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null)
  const [jwtToken, setJwtToken] = useState(null); 

  useEffect(() => {
    // Retrieve stored values from localStorage on component mount
    const storedToken = localStorage.getItem('jwtToken');
    const storedUserId = localStorage.getItem('userId');
    
    if (storedToken && storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
      setJwtToken(storedToken);
    }
  }, []);

  const login = (token, id) => {
    setIsLoggedIn(true);
    setUserId(id)
    setJwtToken(token); 


    // Save to localStorage
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('userId', id);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setJwtToken(null); 



    // Remove from localStorage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');

    console.log('Logged out');
    loggedOut();
  };
  
  const loggedOut = async () => {

    const updatedUser = {
      isLoggedIn: "false"
    }
      try {
        const response = await axios.put(`http://localhost:8081/api/users/${userId}`, updatedUser, {
            params: {
                token: jwtToken // Send JWT as a query parameter
            }
        });
        console.log(response);
      } catch (error) {
          console.error('Error fetching user profile:', error);
      }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, jwtToken, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

