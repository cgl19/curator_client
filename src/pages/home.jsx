import { Helmet } from 'react-helmet-async';

import { Home } from 'src/sections/home/view/';

// ----------------------------------------------------------------------

export default function HomePag() {
  return (
    <>
      <Helmet>
        <title> Accounts | Curator365 </title>
      </Helmet>

      <Home />
    </>
  );
}
