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
// ----------------------------------------------------------------------

const interests = [
  'Sports', 'Music', 'Movies', 'Traveling', 'Reading', 'Cooking', 'Gaming'
];

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

export default function SecondProfileStep({email,password}) {
  
  const theme = useTheme();
  var navigate = useNavigate();
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
   
    if ( !consent || !firstName || !lastName || !country || !language || !gender || !age) {
      toast.error("Please fill in all fields and given consent");
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

        //logging the signed up user
        toast.success("Sign up successfull");
        const loginUri = `${import.meta.env.VITE_BASE_BACKEND_URL}auth/login`;
        let res = await apiCall('post', loginUri, {
          email: email,
          password: password,
        });
       
        if (res.status==true) {
          const loginWait=toast.loading("Getting things ready....");
          dispatch(loginSuccess(res));
          setTimeout(()=>{
            toast.dismiss(loginWait);
            navigate('/');
          },5000)
           
         
         
        }
        else {
          toast.error("Oops! Network error occured while redirecting to dashboard");
        }
      }
       else {
        toast.error("Sign up failed, try again.");
      }
    } catch (error) {
      
      toast.error("Sign up failed, try again.");
    } finally {
      setLoading(false);
    }
  }; 

  const renderForm = (
    <>
     
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              name="firstName"
              label={<Typography variant="body2">First Name</Typography>}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <RequiredAsterisk variant="body2">*</RequiredAsterisk>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              name="lastName"
              label={<Typography variant="body2">Last Name</Typography>}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <RequiredAsterisk variant="body2">*</RequiredAsterisk>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              name="country"
              label={<Typography variant="body2">Country Stay</Typography>}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <RequiredAsterisk variant="body2">*</RequiredAsterisk>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              name="language"
              label={<Typography variant="body2">Language</Typography>}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <RequiredAsterisk variant="body2">*</RequiredAsterisk>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              name="gender"
              label={<Typography variant="body2">Gender</Typography>}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <RequiredAsterisk variant="body2">*</RequiredAsterisk>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              name="age"
              label={<Typography variant="body2">Age</Typography>}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <RequiredAsterisk variant="body2">*</RequiredAsterisk>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" sx={{ mb: 1, color: 'text.primary' }}>
          <Grid item xs={12}>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
   
    <Typography variant="body2" sx={{ color: 'text.primary' }}>
      Common Interests
    </Typography>
    <Typography variant="body2" sx={{ color: 'error.main', mr: 1 }}>
      *
    </Typography>
  </Box>
</Grid>

         
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
        <FormControlLabel
        control={<Checkbox checked={consent} onChange={(e) => setConsent(e.target.checked)} />}
        label="I agree to the terms and conditions and privacy policy."
      />
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
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(0, 0, 0, 0.8) 100%)',
      }}
    >
      <Card
        sx={{
          p: 5,
          width: '80%',
          maxWidth: 800,
        }}
      >
        <Typography variant="h6" gutterBottom>
          User Consent
        </Typography>
        <Typography variant="body2" gutterBottom>
          Please read and agree to the terms and conditions and privacy policy to proceed.
        </Typography>

        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            OR
          </Typography>
        </Divider>

        {renderForm}
      </Card>
    </Box>
  );
}
