import { Helmet } from 'react-helmet-async';

import { ProfileView } from 'src/sections/profile/view';

// ----------------------------------------------------------------------

export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title> Profile | Curator 365 | Client Interface </title>
      </Helmet>

      <ProfileView />
    </>
  );
}
  