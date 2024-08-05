import React from 'react';
import { Container, ImageList, ImageListItem, Typography, Stack, Box, useMediaQuery, useTheme } from '@mui/material';

const mediaData = [
  { id: 1, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 1' },
  { id: 2, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 2' },
  { id: 3, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 3' },
  { id: 4, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 4' },
  { id: 5, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 5' },
  { id: 6, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 6' },
  { id: 7, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 7' },
  { id: 8, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 8' },
  { id: 9, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 9' },
  { id: 10, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 10' },
  { id: 11, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 11' },
  { id: 12, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 12' },
  { id: 13, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 13' },
  { id: 14, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 14' },
  { id: 15, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 15' },
  { id: 16, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 16' },
  { id: 17, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 17' },
  { id: 18, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 18' },
  { id: 19, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 19' },
];

export default function MediaView() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Media Library</Typography>
      </Stack>
      <ImageList variant="masonry" cols={isSmallScreen ? 1 : 4} gap={8}>
        {mediaData.map((media) => (
          <ImageListItem key={media.id}>
            {media.type === 'image' ? (
              <img
                src={media.src}
                alt={media.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                }}
              />
            ) : (
              <Box
                component="video"
                controls
                style={{
                  width: '100%',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                }}
              >
                <source src={media.src} type="video/mp4" />
                Your browser does not support the video tag.
              </Box>
            )}
            <Typography variant="body2" color="textSecondary" component="p" align="center">
              {media.title}
            </Typography>
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
}
