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
import { CSSTransition } from 'react-transition-group';
import Iconify from 'src/components/iconify';
import SecondProfileStep from './profileStep';
import { bgGradient } from 'src/theme/css';  // Import the bgGradient function
import './transitionStyles.css';  // Add this import
import Logo from 'src/components/logo';
import  './style.module.css';



export default function SignUpView() {
  const theme = useTheme();
  const navigate = useNavigate();
  



  const [showPassword, setShowPassword] = useState(false);
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(false);

  const handleFacebookAuth = () => {
    const loaderId = toast.loading("Redirecting...");
    setTimeout(() => {
      toast.dismiss(loaderId);
      toast.success("Redirecting to Facebook...");
    }, 5000);
    navigate('/facebook/auth');
  };

  const handleGoogleAuth = () => {
    setTimeout(() => {
      const loaderId = toast.loading("Redirecting...");
      toast.dismiss(loaderId);
      toast.success("Redirecting to Google...");
    }, 5000);
    navigate('/google/auth');
  }; 

  const handleClick = async () => {
    if (!signUpEmail || !signUpPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    else{
      setStep(true);
      const id=toast.loading("Redirecting to step....")
      setTimeout(()=>{
        toast.dismiss(id)
      })
    }

  };

  const handleBack = () => {
    setStep(false);
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={signUpEmail}
          onChange={(e) => setSignUpEmail(e.target.value)}
        />
        <TextField
          name="password"
          label="Password"
          value={signUpPassword}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setSignUpPassword(e.target.value)}
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

      <LoadingButton
       sx={{marginTop:'15px'}}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        loading={loading}
        disabled={loading}
      >
        Continue
      </LoadingButton>
    </>
  );

  return (
    <>
    {!step &&(

    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgb(255,154,104)100%)',
        
      }}
    > <Logo
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
            position: 'relative',  // Make sure the back button is positioned correctly
          }}
        >
          <Typography sx={{textAlign: 'center'}} variant="h4">Sign Up To Curator 365</Typography>

          <Typography  sx={{textAlign: 'center', mt: 2, mb: 5 }}>
            Already have an account?
            <Link to="/login" variant="subtitle2" sx={{ ml: 0.5 }}>
              Log In
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
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
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          <CSSTransition
            in={!step}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            {renderForm}
          </CSSTransition>

          
        </Card>
      </Stack>
    </Box>
    )}
   
   
   {step && (
  <Box
    sx={{
      height: '100vh',
      width: '100vw',
      overflow: 'hidden', // Prevent horizontal scroll
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CSSTransition
      in={step}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          overflow: 'hidden', // Ensure no overflow
        }}
      >
        <IconButton
          onClick={handleBack}
          sx={{ position: 'absolute', top: 16, left: 16 }}
        >
          <Iconify icon="eva:arrow-back-fill" />
        </IconButton>
        <Divider>
          <SecondProfileStep email={signUpEmail} password={signUpPassword} />
        </Divider>
      </Box>
    </CSSTransition>
  </Box>
)}
    </>
  );
}
