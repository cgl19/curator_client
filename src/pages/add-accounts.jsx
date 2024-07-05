import { Helmet } from 'react-helmet-async';

import { AddAccounts } from 'src/sections/add-accounts';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Accounts | Curator365 </title>
      </Helmet>

      <AddAccounts />
    </>
  );
}
