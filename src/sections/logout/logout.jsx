import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/reducers/authSlice'; // Adjust the path as needed
import apiCall from '../../utils/api'; // Import your API utility function
import { persistor } from '../../store'; // Import persistor

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
   
    const performLogout = async () => {
      try {
        // Make an API call to the server to log out
       // const uri=`${import.meta.env.VITE_BASE_BACKEND_URL}auth/logout`;
      //  await apiCall('post', 'https://your-backend-url.com/auth/logout'); // Adjust the URL as needed

        // Dispatch the logout action to clear user data from Redux
        dispatch(logout());

        // Optionally, clear any tokens or session data stored in local storage or cookies
        localStorage.removeItem('authToken'); // Adjust based on your storage method

        // Clear persisted Redux state
        persistor.purge();

        // Redirect to the login page
        navigate('/login');
      } catch (error) {
        console.error('Error during logout:', error);
        // Handle any errors, e.g., display a notification to the user
      }
    };

    performLogout();
  }, [dispatch, navigate]);

  return null; // This component does not need to render anything
};

export default LogoutButton;
