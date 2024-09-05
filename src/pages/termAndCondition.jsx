import { Helmet } from 'react-helmet-async';

import { TermAndCondition } from 'src/sections/services/view/';

// ----------------------------------------------------------------------

export default function TermAndConditionPage() {
  return (
    <>
      <Helmet>
        <title> Accounts | Curator365 </title>
      </Helmet>

      <TermAndCondition />
    </>
  );
}
