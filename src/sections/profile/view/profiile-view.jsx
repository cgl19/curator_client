import React from 'react';
import toast from 'react-hot-toast';
import { Container, Typography, TextField, MenuItem, Box, Avatar, Grid, useMediaQuery, useTheme, Button, Paper, Autocomplete } from '@mui/material';
import { useSelector } from 'react-redux';

// Mock function for saving profile
const handleProfileSave = () => {
  toast.success("Saved Successfully!");
}

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const countries = [
  { value: 'pak', label: 'Pakistan' },
  { value: 'us', label: 'United States' },
  { value: 'can', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  // Add more countries as needed
];

const languages = [
  { value: 'en', label: 'English' },
  { value: 'ur', label: 'Urdu' },
  { value: 'ar', label: 'Arabic' },
];

const interval = [
  { value: '1', label: 'Once in a day' },
  { value: '2', label: 'Once a week' },
  { value: '3', label: 'Once a month' },
];
 
const preferences = [
  { value: 'sports', label: 'Sports' },
  { value: 'music', label: 'Music' },
  { value: 'movies', label: 'Movies' },
  { value: 'reading', label: 'Reading' },
  { value: 'traveling', label: 'Traveling' },
  { value: 'gaming', label: 'Gaming' },
  // Add more preferences as needed
];

export default function ProfileView() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box display="flex" justifyContent="center" mb={4} mt={-10}>
          <Avatar
            alt="User Image"
            src="/assets/images/avatars/avatar_12.jpg" // Add the path to your user image
            sx={{ width: 100, height: 100 }}
          />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label={<span>Name <span style={{ color: 'red' }}>*</span></span>}
              value={user.fullName}
              variant="outlined"
              fullWidth
             
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={<span>Email <span style={{ color: 'red' }}>*</span></span>}
              value={user.email}
              variant="outlined"
              fullWidth
              
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={<span>Age <span style={{ color: 'red' }}>*</span></span>}
              value={user.age}
              variant="outlined"
              fullWidth
             
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={<span>Gender <span style={{ color: 'red' }}>*</span></span>}
              value={user.gender}
              variant="outlined"
             
              fullWidth
             
            >
              {genders.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={<span>Country <span style={{ color: 'red' }}>*</span></span>}
              value={user.country}
              variant="outlined"
              select
              fullWidth
              
            >
              {countries.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={<span>Language <span style={{ color: 'red' }}>*</span></span>}
              value={user.language}
              variant="outlined"
              select
              fullWidth
             
            >
              {languages.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
             value={user?.interval}
              label={<span>Interval <span style={{ color: 'red' }}>*</span></span>}
              variant="outlined"
              select
              fullWidth
              
            >
              {interval.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
              </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* <Grid item xs={12}>
            <Autocomplete
              multiple  
              options={preferences}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label={<span>Preferences <span style={{ color: 'red' }}>*</span></span>}
                  placeholder="Select preferences"
                 
                />
              )}
              fullWidth
            />
          </Grid> */}
        </Grid>
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button onClick={handleProfileSave} variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
