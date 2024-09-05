import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import apiCall from 'src/utils/api';
import { useSelector } from 'react-redux';

import ProductCard from './product-card';
// will use later
import ProductSort from './product-sort';
import ProductFilters from './product-filters';
import ProductCartWidget from './product-cart-widget';
// will use later
// ----------------------------------------------------------------------

export default function Scheduled_Failed_Page() {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const filteredProducts = products.filter(
    (product) => product.status === "scheduled" || product.status === "failed"
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uri = `${import.meta.env.VITE_BASE_BACKEND_URL}post`;
        const response = await apiCall('POST', uri, {
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user._id }),
        });
        console.log(response.post);
        setProducts(response.post);
      }
      catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [user._id]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Scheduled/Failed Posts
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
      </Stack>

  <Grid container spacing={3}>
  {filteredProducts.map((product) => (
    <Grid item key={product._id} xs={12} sm={6} md={3}>
      <ProductCard product={product} />
    </Grid>
  ))}
</Grid>
    </Container>
  );
}
