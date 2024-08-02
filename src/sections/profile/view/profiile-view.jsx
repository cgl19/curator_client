import React from 'react';
import toast from 'react-hot-toast';
import { Container, Typography, TextField, MenuItem, Box, Avatar, Stack, Grid, useMediaQuery, useTheme, Button, Paper, Autocomplete } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';





const handleProfileSave=()=>{
    toast.success("Saved Successfully!")
}


const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
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
  { value: '2', label: 'Once ia a weak' },
  { value: '3', label: 'Once in a month ' },
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  (()=>{
         console.log(user)
  })()

  return (
    <Container maxWidth="md" sx={{ mt: 4 }} >
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
            <TextField label="Name" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Email" value={user.email} variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Age" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Gender" variant="outlined" select fullWidth>
              {genders.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Country" variant="outlined" select fullWidth>
              {countries.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Language" variant="outlined" select fullWidth>
              {languages.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Interval" variant="outlined" select fullWidth>
              {interval.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={preferences}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Preferences" placeholder="Select preferences" />
              )}
              fullWidth
            />
          </Grid>
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
