import React, { useState } from 'react';
import { Container, Stack, Typography, Grid, Box } from '@mui/material';
import AppWidgetSummary from './components/app-widget-summary';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate, Link } from 'react-router-dom';
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper/core';
import 'swiper/swiper-bundle.min.css';
import './style.css'; // Import custom styles for Swiper if needed
import AppWidgetAdd from './components/app-widget-add';
import FacebookPage from './connects/facebookPage/facebookPage';

SwiperCore.use([Pagination, Navigation, Autoplay]);

function returnAccountIconImage(account) {
  const iconMap = {
    facebook: '/assets/icons/navbar/ic_facebook.svg',
    youtube: '/assets/icons/navbar/ic_youtube.svg',
    instagram: '/assets/icons/navbar/ic_instagram.svg',
    twitter: '/assets/icons/navbar/ic_twitter.svg',
    linkedin: '/assets/icons/navbar/ic_linkedin.svg',
    tiktok: '/assets/icons/navbar/ic_tiktok.svg',
  };

  return <img alt="icon" src={iconMap[account.type]} width={75} height={75} />;
}

const gridItemStyle = {
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  backgroundColor: '#ffffff',
  transition: 'transform 0.3s ease-in-out',
};

const UserPage = () => {
  const navigate = useNavigate();

  const handleFacebookPageClick = () => {
    navigate('/connection/facebook/page');
  };
const handleFacebookGroupClick=()=>{
  navigate('/connection/facebook/group');
}

const handleInstagramClick=()=>{
  navigate('/connection/instagram');
}
const handleLinkedinClick=()=>{
  navigate('/connection/linkedin');
}
const handleTiktokClick=()=>{
  navigate('/connection/tiktok');
  }
  const handleYoutubeClick=()=>{
    navigate('/connection/youtube');
  }

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Accounts</Typography>
      </Stack>

      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: true }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
      >
        {/* <SwiperSlide className="swiper-slide-custom">
          <AppWidgetAdd
            onClick={handleFacebookPageClick}
            title="Facebook Page"
            icon={returnAccountIconImage({ type: 'facebook' })}
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-custom">
          <AppWidgetAdd
            onClick={handleFacebookGroupClick}
            title="Facebook Group"
            icon={returnAccountIconImage({ type: 'facebook' })}
          />
        </SwiperSlide> */}
          <SwiperSlide className="swiper-slide-custom">
          <AppWidgetAdd
            onClick={handleTiktokClick}
            title="Tiktok"
            icon={returnAccountIconImage({ type: 'tiktok' })}
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-custom">
          <AppWidgetAdd
            title="Twitter"
            icon={returnAccountIconImage({ type: 'twitter' })}
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-custom">
          <AppWidgetAdd
          onClick={handleLinkedinClick}
            title="LinkedIn"
            icon={returnAccountIconImage({ type: 'linkedin' })}
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-custom">
          <AppWidgetAdd
             onClick={handleInstagramClick}
            title="Instagram"
            icon={returnAccountIconImage({ type: 'instagram' })}
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide-custom">
          <AppWidgetAdd
           onClick={handleYoutubeClick}
            title="Youtube"
            icon={returnAccountIconImage({ type: 'youtube' })}
          />
        </SwiperSlide>
      
      </Swiper>

      <Typography marginTop={5} variant="h6">Attached Accounts</Typography>
    
      <Grid container spacing={5} marginTop={3}>
        {/* <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={<Box component="span" sx={{ ml: 2 }}>Huzaifa</Box>}
            icon={returnAccountIconImage({ type: 'facebook' })}
            status={true}
            style={gridItemStyle}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </Grid> */}
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={<Box component="span" sx={{ ml: 2 }}>Usama</Box>}
            icon={returnAccountIconImage({ type: 'linkedin' })}
            status={false}
            style={gridItemStyle}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={<Box component="span" sx={{ ml: 2 }}>Adnan</Box>}
            icon={returnAccountIconImage({ type: 'youtube' })}
            status={true}
            style={gridItemStyle}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title={<Box component="span" sx={{ ml: 2 }}>Hamza</Box>}
            icon={returnAccountIconImage({ type: 'instagram' })}
            status={false}
            style={gridItemStyle}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserPage;
