// src/sections/socialAuth/google/googleAuth.jsx
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const GoogleAuth = () => {
  const redirectUri =import.meta.env.VITE_GOOGLE_REDIRECT_URL;
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (clientId && redirectUri) {
      const responseType = 'code';
      const scope = 'profile email'; // Add any other scopes you need
      // const uri=`${import.meta.env.VITE_BASE_BACKEND_URL}auth/registerClient`;
      const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${scope}`;

      window.location.href = url; // Redirect to Google
    }
     else {
     
     toast.error("Oops! Network Error Occured")
    }
  }, [clientId, redirectUri]);

  return null; // This component doesn't need to render anything
};

// GoogleAuth.propTypes = {
//   redirectUri: PropTypes.string.isRequired,
//   clientId: PropTypes.string.isRequired,
// };

export default GoogleAuth;
