import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import apiCall from 'src/utils/api';
import { loginSuccess } from '../../store/reducers/authSlice';
import Logo from 'src/components/logo';
import  './style.module.css';
// ----------------------------------------------------------------------

const style = {
  width: '100vw',
  paddingLeft: '0px',
  paddingRight: '0px',
  boxSizing: 'border-box'
}; 


const interests = ['Sports', 'Music', 'Movies', 'Traveling', 'Reading', 'Cooking', 'Gaming'];

// Custom styles for OutlinedInput
const CustomOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.text.primary, // Make sure the border color is visible
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main, // Change border color on hover
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main, // Change border color when focused
  },
}));

// Custom styles for the asterisk
const RequiredAsterisk = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  marginLeft: theme.spacing(0.5),
}));

export default function SecondProfileStep({ email, password }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [language, setLanguage] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [commonInterests, setCommonInterests] = useState([]);

  const handleClick = async () => {
    if (!consent || !firstName || !lastName || !country || !language || !gender || !age) {
      toast.error('Please fill in all fields and give consent');
      return;
    }

    try {
      setLoading(true);
      const uri = `${import.meta.env.VITE_BASE_BACKEND_URL}auth/registerClient`;
      const SignUpRes = await apiCall('POST', uri, {
        email: email,
        password: password,
        firstName,
        lastName,
        country,
        language,
        gender,
        age,
        commonInterests,
      });

      if (SignUpRes.status) {
        toast.success('Sign up successful');
        const loginUri = `${import.meta.env.VITE_BASE_BACKEND_URL}auth/login`;
        let res = await apiCall('POST', loginUri, {
          email: email,
          password: password,
        });

        if (res.status) {
          const loginWait = toast.loading('Getting things ready....');
          dispatch(loginSuccess(res));
          setTimeout(() => {
            toast.dismiss(loginWait);
            navigate('/');
          }, 5000);
        } else {
          toast.error('Oops! Network error occurred while redirecting to dashboard');
        }
      } else {
        toast.error('Sign up failed, try again.');
      }
    } catch (error) {
      toast.error('Sign up failed, try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderForm = (
    <>
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 50 },
          left: { xs: 16, md: 24 },
        }}
      />
      <Grid container spacing={2}>
        {/* Fields for First Name, Last Name, Country, Language, Gender, Age */}
        {[
          { label: 'First Name', value: firstName, setter: setFirstName },
          { label: 'Last Name', value: lastName, setter: setLastName },
          { label: 'Country Stay', value: country, setter: setCountry },
          { label: 'Language', value: language, setter: setLanguage },
          { label: 'Gender', value: gender, setter: setGender },
          { label: 'Age', value: age, setter: setAge },
        ].map((field, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                name={field.label.toLowerCase().replace(' ', '')}
                label={
                  <Typography variant="body2" display="flex" flexDirection="row">
                    {field.label} <Typography sx={{ color: 'error.main' }}>*</Typography>
                  </Typography>
                }
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="body2" sx={{ mb: 1, color: 'text.primary' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                Common Interests
              </Typography>
              <Typography variant="body2" sx={{ color: 'error.main', mr: 1 }}>
                *
              </Typography>
            </Box>
          </Typography>
          <Select
            multiple
            value={commonInterests}
            onChange={(e) => setCommonInterests(e.target.value)}
            input={<CustomOutlinedInput />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            fullWidth
          >
            {interests.map((interest) => (
              <MenuItem key={interest} value={interest}>
                {interest}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                sx={{ marginLeft: '15px' }}
              />
            }
            label="I agree to the terms, conditions and privacy policy."
            sx={{
              '& .MuiFormControlLabel-label': {
                flexWrap: 'wrap',
                '@media (max-width: 500px)': {
                  fontSize: '11px',
                  lineHeight: '1.2',
                },
              },
            }}
          />
        </Grid>
      </Grid>
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        loading={loading}
        disabled={loading}
        sx={{ mt: 3 }}
      >
        Submit
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgb(255,154,104) 100%)',
        overflow: 'hidden', // Prevent horizontal scroll
      }}
    >
      <Card
        sx={{
          p: 5,
          width: '100%',
          maxWidth: 800,
          boxSizing: 'border-box', // Ensure padding and border are included in the width/height
          overflow: 'hidden', // Ensure no overflow
        }}
      >
        <Typography variant="h6" gutterBottom>
          User Consent
        </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            flexWrap: 'wrap',
            '@media (max-width: 600px)': {
              fontSize: '9px',
              lineHeight: '1.2',
            },
          }}
        >
          Please read and agree to our site terms, conditions, and privacy policy.
        </Typography>
  
        <Divider sx={{ my: 3 }} />
  
        {renderForm}
      </Card>
    </Box>
  );
}
