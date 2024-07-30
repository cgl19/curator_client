import React, { useEffect } from 'react';

const LinkedinPage = () => {
  const redirectUri = import.meta.env.VITE_LINKEDIN_REDIRECT_URI;
  const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
  const responseType = 'code';
  const scope = 'r_liteprofile%20r_emailaddress%20w_member_social'; // Adjust scopes as needed

  useEffect(() => {
    if (clientId && redirectUri) {
      const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=${responseType}&client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=${scope}`;

      window.location.href = url; // Redirect to LinkedIn
    } else {
      console.error('LinkedIn authentication URL parameters are missing.');
    }
  }, [clientId, redirectUri]);

  return null; // This component doesn't need to render anything
};

export default LinkedinPage;
 
