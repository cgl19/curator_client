import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch } from 'react-redux';
import apiCall from 'src/utils/api';
import { loginSuccess } from '../../store/reducers/authSlice';
import { bgGradient } from 'src/theme/css'; // Ensure this import is correct
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

export default function LoginView() { 
  const dispatch = useDispatch();
  const theme = useTheme(); 
  const navigate = useNavigate(); 

  const [showPassword, setShowPassword] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loading, setLoading] = useState(false);



  const handleFacebookAuth=()=>{
    const loaderId=toast.loading("Redirecting...")
    setTimeout(()=>{
      toast.dismiss(loaderId)
      toast.success("Redirecting to Facebook...")
    },5000)
    navigate('/facebook/auth')
  }

  const handleGoogleAuth=()=>{
    setTimeout(()=>{
      const loaderId=toast.loading("Redirecting...")
      toast.dismiss(loaderId)
      toast.success("Redirecting to Google...")
    },5000)
    navigate('/google/auth')
  }

  
  const handleClick = async () => {
    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields");
      return;
    }
   
    try {  
      setLoading(true);
      var toastId = toast.loading('Logging...');
      const uri=`${import.meta.env.VITE_BASE_BACKEND_URL}auth/login`;
      const res = await apiCall('post', uri, {
        email: loginEmail,
        password: loginPassword,
      });
       
     
      if (res.status) {
        toast.dismiss(toastId);
        try{
          console.log(res)
          dispatch(loginSuccess(res));
          toast.success("Logged in successfully");
          navigate('/');
        }catch(error){
          console.log("Error: ",error)
          toast.dismiss(toastId)
          toast.error("Oops! An error occurred while trying to log in. Please try again.")
          return;
        }
      
      } else {
        toast.dismiss(toastId);
        toast.error("Oops! login failed, try again.");
      }
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId);
      toast.error("Oops! Network error occured");
    } finally {
      setLoading(false);
    }
  }; 

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField 
          name="email"
          label="Email address" 
          value={loginEmail} 
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <TextField
          name="password"
          label="Password*"
          value={loginPassword}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setLoginPassword(e.target.value)}
          InputProps={{
            endAdornment: ( 
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        loading={loading}
        disabled={loading}
        sx={{
          mt: 5,
        }}
      >
        Login
      </LoadingButton>
    </>
  ); 

  return (
    <Box
    sx={{
      ...bgGradient({
        color: alpha(theme.palette.background.default, 0.9),
        imgUrl: '/assets/background/overlay_4.jpg',
      }),
      height: 1,
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgb(255,154,104)100%)',
    }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
      <Card
  sx={{
    p: 5,
    width: 1,
    maxWidth: 420,
  }}
>
  <Typography 
    variant="h4" 
    sx={{ 
      textAlign: 'center', 
      mx: 'auto', 
      mb: 2 
    }}
  >
    Sign in to Curator365
  </Typography>

  <Typography 
    variant="body2" 
    sx={{ 
      textAlign: 'center', 
      mx: 'auto', 
      mb: 5 
    }}
  >
    Don’t have an account?
    <Link to="/signup" variant="subtitle2" sx={{ ml: 0.5 }}>
      Get started
    </Link>
  </Typography> 

  {/* <Stack direction="row" spacing={2}>
    <Button
      onClick={handleGoogleAuth}
      fullWidth
      size="large"
      color="inherit"
      variant="outlined"
      sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
    >
      <Iconify icon="eva:google-fill" color="#DF3E30" />
    </Button>

    <Button
      onClick={handleFacebookAuth}
      fullWidth
      size="large"
      color="inherit"
      variant="outlined"
      sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
    >
      <Iconify icon="eva:facebook-fill" color="#1877F2" />
    </Button>

    <Button
      fullWidth
      size="large"
      color="inherit"
      variant="outlined"
      sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
    >
      <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
    </Button>
  </Stack> 

  <Divider sx={{ my: 3 }}>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      OR
    </Typography>
  </Divider>*/}

  {renderForm}
</Card>
      </Stack>
    </Box>
  );
}
