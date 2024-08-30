import { Helmet } from 'react-helmet-async';

import { Scheduled_Failed_Page } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function ScheduledPage() {
  return (
    <>
      <Helmet> 
        <title> Posts | Curator365 | Client Interface </title>
      </Helmet>

      <Scheduled_Failed_Page />
    </>
  );
}
