import React, { useEffect } from 'react';

const FacebookGroup = () => {
  const redirectUri = import.meta.env.VITE_FACEBOOK_REDIRECT_URI;
  const clientId = import.meta.env.VITE_FACEBOOK_APP_ID;

  useEffect(() => {
    if (clientId && redirectUri) {
      const responseType = 'code';
      const scope = 'groups_access_member_info'; // Updated scopes for groups

      const url = `https://www.facebook.com/v10.0/dialog/oauth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=${responseType}&scope=${scope}`;

      window.location.href = url; // Redirect to Facebook
    } else {
      console.error('Facebook authentication URL parameters are missing.');
    }
  }, [clientId, redirectUri]);

  return null; // This component doesn't need to render anything
};

export default FacebookGroup;
