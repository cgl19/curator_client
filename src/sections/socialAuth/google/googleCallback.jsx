import PropTypes from 'prop-types';
import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import apiCall from 'src/utils/api';

import { loginSuccess } from 'src/store/reducers/authSlice';

const FacebookCallback = ({ clientId, redirectUri }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getAccessToken = async (code) => {
      try {
        const response = await apiCall('post', 'https://graph.facebook.com/v10.0/oauth/access_token', {
          client_id: clientId,
          redirect_uri: redirectUri,
          client_secret: 'your-facebook-client-secret',
          code,
        });
        const { access_token } = response.data;
       console.log(access_token)
        // Exchange access token for user data and handle authentication
        const userResponse = await apiCall('get', 'https://graph.facebook.com/me?fields=id,name,email&access_token=' . access_token);
        dispatch(loginSuccess(userResponse.data));
        navigate('/'); // Redirect to home page after successful login
      } catch (error) {
        console.error('Error during Facebook authentication:', error);
        navigate('/login'); // Redirect to login page on error
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      getAccessToken(code);
    } else {
      console.error('No code parameter found in URL.');
      navigate('/login');
    }
  }, [clientId, redirectUri, dispatch, navigate]);

  return null; // This component does not need to render anything
};

// FacebookCallback.propTypes = {
//   clientId: PropTypes.string.isRequired,
//   redirectUri: PropTypes.string.isRequired,
// };

export default FacebookCallback;
