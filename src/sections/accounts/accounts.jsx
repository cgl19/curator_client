import React, { useState, useEffect } from 'react';
import { Container, Stack, Typography, Grid, Box } from '@mui/material';
import AppWidgetSummary from './components/app-widget-summary';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate, Link } from 'react-router-dom';
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper/core';
import 'swiper/swiper-bundle.min.css';
import './style.css'; // Import custom styles for Swiper if needed
import AppWidgetAdd from './components/app-widget-add';
import FacebookPage from './connects/facebookPage/facebookPage';
import { useSelector, useDispatch } from 'react-redux';
SwiperCore.use([Pagination, Navigation, Autoplay]);
import apiCall from '../../../src/utils/api';

function returnAccountIconImage(account) {
  const iconMap = {
    facebook: '/assets/icons/navbar/ic_facebook.svg',
    youtube: '/assets/icons/navbar/ic_youtube.svg',
    instagram: '/assets/icons/navbar/ic_instagram.svg',
    twitter: '/assets/icons/navbar/ic_twitter.svg',
    linkedin: '/assets/icons/navbar/ic_linkedin.svg',
    tiktok: '/assets/icons/navbar/ic_tiktok.svg',
    threedots: '/assets/icons/delete-svg-com.svg',
    // threedots: '/assets/icons/three-dots-vertical.svg',
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
  const user = useSelector((state) => state.auth.user);
  const [userAccounts, setuserAccounts] = useState([]);

  const handleFacebookPageClick = () => {
    navigate('/connection/facebook/page');
  };

  const handleFacebookGroupClick = () => {
    navigate('/connection/facebook/group');
  };

  const handleInstagramClick = () => {
    navigate('/connection/instagram');
  };
  const handleLinkedinClick = () => {
    navigate('/connection/linkedin');
  };
  const handleTiktokClick = () => {
    navigate('/connection/tiktok');
  };
  const handleYoutubeClick = () => {
    navigate('/connection/youtube');
  };

  const getUserAccountDetail = async () => {
    // Mock API call to get user account details
    const uri = `${import.meta.env.VITE_BASE_BACKEND_URL}getUserAccounts`;
    const response = await apiCall('POST', uri, {
      id: user._id,
    });

    if (response.status) {
      setuserAccounts(response.accounts); //array of objects
      console.log(response.accounts);

      return;
    } else {
      setuserAccounts([]);
      return;
    }
  };

  const handleSelectedAccount = (platform, account_id) => {
    if (platform.toLowerCase().includes('tiktok')) {
      navigate(`/tiktok/postupload/${platform}/${account_id}`);
    }
    toast('Waiting for platform resource...');
    return;
  };



  useEffect(() => {
    getUserAccountDetail();
  }, []);
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
        <SwiperSlide className="swiper-slide-custom">
          <AppWidgetAdd
            onClick={handleTiktokClick}
            title="Tiktok"
            icon={returnAccountIconImage({ type: 'tiktok' })}
          />
        </SwiperSlide>
        {/* <SwiperSlide className="swiper-slide-custom">
          <AppWidgetAdd title="Twitter" icon={returnAccountIconImage({ type: 'twitter' })} />
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
        </SwiperSlide> */}
      </Swiper>

      <Typography marginTop={5} variant="h6">
        Attached Accounts({userAccounts.length})
      </Typography>

      <Grid container marginTop={5}>
        {userAccounts &&
          userAccounts?.map((account) => (
            <Grid
              item
              key={account._id} // Unique key assigned here
              xs={12}
              sm={6}
              md={3}
              sx={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <AppWidgetSummary
                title={<Box component="span">{account?.name.toUpperCase()}</Box>}
                icon={returnAccountIconImage({ type: account?.platform.toLowerCase() })}
                threedot={returnAccountIconImage({ type: 'threedots' })}
                status={true}
                account={account}
                accessTokenExpiry={account?.accessTokenExpiry}
                style={gridItemStyle}
                onSubmit={(e) => handleSelectedAccount(account.platform, account._id)}
                getUserAccountsOnRefresh={getUserAccountDetail}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.cursor = 'pointer';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.cursor = 'default';
                }}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};
export default UserPage;




