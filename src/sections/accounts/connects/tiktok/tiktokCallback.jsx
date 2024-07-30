import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TikTokCallback = () => {
  const location = useLocation();
  const code = new URLSearchParams(location.search).get('code');

  useEffect(() => {
    if (code) {
      const redirectUri = import.meta.env.VITE_TIKTOK_REDIRECT_URI;
      const clientId = import.meta.env.VITE_TIKTOK_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_TIKTOK_CLIENT_SECRET;

      const url = `https://open-api.tiktok.com/oauth/access_token/`;

      const data = {
        client_key: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri
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
          console.log('Access Token:', data.data.access_token);
          // Store the access token securely
        })
        .catch(error => {
          console.error('Error fetching access token:', error);
        });
    }
  }, [code]);

  return <div>Loading...</div>;
};

export default TikTokCallback;
