import { Helmet } from 'react-helmet-async';

import { MediaView } from 'src/sections/media/view';

// ----------------------------------------------------------------------

export default function MediaPage() {
  return (
    <>
      <Helmet>
        <title> Media | Curator 365 </title>
      </Helmet>

      <MediaView />
    </>
  );
}
  