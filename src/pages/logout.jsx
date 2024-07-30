import { Helmet } from 'react-helmet-async';

import { LogoutButton } from 'src/sections/logout/';

// ----------------------------------------------------------------------

export default function LogoutPage() {
  return (
    <>
      <Helmet> 
        <title> Logout | Curator365 | Client Interface </title>
      </Helmet>

      <LogoutButton />
    </>
  ); 
}
