import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
const TikTokPage = () => {
const user = useSelector((state) => state.auth.user);
  const clientKey = import.meta.env.VITE_TIKTOK_CLIENT_KEY;
  const redirectUri = import.meta.env.VITE_TIKTOK_REDIRECT_URI;

  useEffect(() => { 
    if (clientKey && redirectUri) {
      const csrfState = Math.random().toString(36).substring(2);
      localStorage.setItem('csrfState', csrfState);

      // Generate a random user ID
      console.log(user._id)
      if(user._id){
      const userId =user._id

      // Correctly formatted scopes as a comma-separated string
      const scope = [
        'user.info.basic',
        'user.info.profile',
        'video.list',
        'video.publish',
        'user.info.stats'
      ].join(',');

      const responseType = 'code';

      // Add user_id to the state parameter
      const state = `${csrfState}:${userId}`;

      const url = `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&scope=${scope}&response_type=${responseType}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}&user_id=${userId}`;

      window.location.href = url; // Redirect to TikTok
    } 
}
else {
    toast.error("Oops! it does not matter what happend,it's our mistake")
      console.error('TikTok authentication URL parameters are missing.');
    }
  }, [clientKey, redirectUri]);

  return null; // This component doesn't need to render anything
};

export default TikTokPage;
