import { Helmet } from 'react-helmet-async';

import { PrivacyPolicy } from 'src/sections/services/view/';

// ----------------------------------------------------------------------

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title> Accounts | Curator365 </title>
      </Helmet>

      <PrivacyPolicy />
    </>
  );
}
