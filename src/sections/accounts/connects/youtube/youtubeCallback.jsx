import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const YouTubeCallback = () => {
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');

  useEffect(() => {
    if (code) {
      const redirectUri = import.meta.env.VITE_YOUTUBE_REDIRECT_URI;
      const clientId = import.meta.env.VITE_YOUTUBE_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_YOUTUBE_CLIENT_SECRET;

      const url = `https://oauth2.googleapis.com/token`;

      const data = {
        code: code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Access Token:', data.access_token);
          console.log('Refresh Token:', data.refresh_token);
          // Store the tokens securely
        })
        .catch(error => {
          console.error('Error fetching access token:', error);
        });
    }
  }, [code]);

  return <div>Loading...</div>;
};

export default YouTubeCallback;
