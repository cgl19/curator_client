import { Helmet } from 'react-helmet-async';

import { SignUp } from 'src/sections/signup';

// ----------------------------------------------------------------------

export default function SignUPage() {
  return (
    <>
      <Helmet>
        <title> SingUp | Curator365 | Client Interface </title>
      </Helmet>

      <SignUp/>
    </>
  );
}
