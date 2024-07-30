import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
//  import { loginSuccess } from '../store/reducers/authSlice'; // Adjust the path as needed

const FacebookCallback = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    if (code) {
      // Exchange the authorization code for an access token
      const exchangeCodeForToken = async () => {
        try {
          // const uri=`${import.meta.env.VITE_BASE_BACKEND_URL}auth/registerClient`;
          const response = await axios.post('https://your-backend-url.com/auth/facebook', {
            code,
          });

          // Assuming your backend returns user and tokens
          if (response.data) {
           // dispatch(loginSuccess(response.data));
            // Redirect to the home page or wherever you want
           // window.location.href = '/';
          }
        } catch (error) {
          console.error('Error during Facebook callback:', error);
          // Handle any errors
        }
      };

      exchangeCodeForToken();
    } else {
      console.error('No authorization code found in URL');
    }
  }, [location.search, dispatch]);

  return <div>Loading...</div>; // Or any loading indicator
};

export default FacebookCallback;
