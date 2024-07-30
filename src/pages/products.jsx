import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet> 
        <title> Posts | Curator365 | Client Interface </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
