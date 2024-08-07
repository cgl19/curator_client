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
import './style.module.css';

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
    borderColor: theme.palette.text.primary,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
}));
const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.text.primary,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
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

  const genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ];

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'pak', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    // Add more countries as needed
  ];

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'ur', label: 'Urdu' },
    { value: 'ar', label: 'Arabic' },
  ];

  const ages = [
    { value: '18-24', label: '18-24' },
    { value: '25-34', label: '25-34' },
    { value: '35-44', label: '35-44' },
    { value: '45-54', label: '45-54' },
    { value: '55+', label: '55+' },
  ];

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
        {/* Fields for First Name, Last Name */}
        {[
          { label: 'First Name', value: firstName, setter: setFirstName },
          { label: 'Last Name', value: lastName, setter: setLastName },
        ].map((field, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomTextField
                name={field.label.toLowerCase().replace(' ', '')}
                label={
                  <Typography variant="body2" display="flex" flexDirection="row">
                    {field.label} <RequiredAsterisk>*</RequiredAsterisk>
                  </Typography>
                }
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Box>
          </Grid>
        ))}
        {/* Select for Country */}
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" display="flex" flexDirection="row">
            Country Stay <RequiredAsterisk>*</RequiredAsterisk>
          </Typography>
          <Select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            input={<CustomOutlinedInput />}
            fullWidth
          >
            {countries.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        {/* Select for Language */}
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" display="flex" flexDirection="row">
            Language <RequiredAsterisk>*</RequiredAsterisk>
          </Typography>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            input={<CustomOutlinedInput />}
            fullWidth
          >
            {languages.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        {/* Select for Gender */}
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" display="flex" flexDirection="row">
            Gender <RequiredAsterisk>*</RequiredAsterisk>
          </Typography>
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            input={<CustomOutlinedInput />}
            fullWidth
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        {/* Select for Age */}
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" display="flex" flexDirection="row">
            Age <RequiredAsterisk>*</RequiredAsterisk>
          </Typography>
          <Select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            input={<CustomOutlinedInput />}
            fullWidth
          >
            {ages.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        {/* Select for Common Interests */}
        {/* <Grid item xs={12}>
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
        </Grid> */}
        {/* Consent Checkbox */}
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
        overflow: 'hidden',
      }}
    >
      <Card
        sx={{
          p: 5,
          width: '100%',
          maxWidth: 800,
          boxSizing: 'border-box',
          overflow: 'hidden',
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
