import React, { useEffect } from 'react';

const InstagramAuth = () => {
  const redirectUri = import.meta.env.VITE_INSTAGRAM_REDIRECT_URI;
  const clientId = import.meta.env.VITE_INSTAGRAM_APP_ID;
  const responseType = 'code';
  const scope = 'user_profile,user_media';

  useEffect(() => {
    if (clientId && redirectUri) {
      const url = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=${responseType}&scope=${scope}`;

      window.location.href = url; // Redirect to Instagram
    } else {
      console.error('Instagram authentication URL parameters are missing.');
    }
  }, [clientId, redirectUri]);

  return null; // This component doesn't need to render anything
};

export default InstagramAuth;