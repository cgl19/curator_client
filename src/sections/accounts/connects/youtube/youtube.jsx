import React, { useEffect } from 'react';

const YouTubePage = () => {
  const redirectUri = import.meta.env.VITE_YOUTUBE_REDIRECT_URI;
  const clientId = import.meta.env.VITE_YOUTUBE_CLIENT_ID;

  useEffect(() => {
    if (clientId && redirectUri) {
      const responseType = 'code';
      const scope = 'https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.force-ssl'; // Adjust scopes as needed

      const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=${responseType}&scope=${encodeURIComponent(scope)}&access_type=offline`;

      window.location.href = url; // Redirect to YouTube
    } else {
      console.error('YouTube authentication URL parameters are missing.');
    }
  }, [clientId, redirectUri]);

  return null; // This component doesn't need to render anything
};

export default YouTubePage;
