import { Helmet } from 'react-helmet-async';

import { TikTokPostUpload } from 'src/sections/tiktok-ui/view';

// ----------------------------------------------------------------------

export default function TikTokPostUploadPage() {
    const user = {
        nickname: 'JohnDoe',
        profilePic:'/assets/images/avatars/avatar_25.jpg'
      };
     
  return (
    <>
      <Helmet>
        <title> User | Curator365 | Client Interface </title>
      </Helmet>
      <TikTokPostUpload user={user} />
    </>
  ); 
}
       