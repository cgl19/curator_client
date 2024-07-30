import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const InstagramCallback = () => {
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');

  useEffect(() => {
    if (code) {
      const redirectUri = import.meta.env.VITE_INSTAGRAM_REDIRECT_URI;
      const clientId = import.meta.env.VITE_INSTAGRAM_APP_ID;
      const clientSecret = import.meta.env.VITE_INSTAGRAM_APP_SECRET;

      const url = `https://api.instagram.com/oauth/access_token`;

      const data = {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        code: code
      };

      fetch(url, {
        method: 'POST',
        body: new URLSearchParams(data),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log('Access Token:', data.access_token);
          console.log('Refresh Token:', data.refresh_token); // If available
          // Store the tokens securely
        })
        .catch(error => {
          console.error('Error fetching access token:', error);
        });
    }
  }, [code]);

  return <div>Loading...</div>;
};

export default InstagramCallback;
