import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Container, Typography, TextField, MenuItem, Box, Avatar, Grid, useMediaQuery, useTheme, Button, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

// Mock function for saving profile


const genders = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

const countries = [
  { value: 'pak', label: 'Pakistan' },
  { value: 'us', label: 'United States' },
  { value: 'can', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  // Add more countries as needed
];

const languages = [
  { value: 'English', label: 'English' },
  { value: 'Urdu', label: 'Urdu' },
  { value: 'Arabic', label: 'Arabic' },
];

const interval = [
  { value: '1', label: 'Once in a day' },
  { value: '2', label: 'Once a week' },
  { value: '3', label: 'Once a month' },
];

export default function ProfileView() {
  const user = useSelector((state) => state.auth.user);
 

  // Create local state to hold the form data
  const [formData, setFormData] = useState({
    fullName: user.fullName || '',
    email: user.email || '',
    age: user.age || '',
    gender: user.gender || '',
    country: user.country || '',
    language: user.language || '',
    interval: user.interval || '',
  });

  const handleProfileSave = () => { 
    console.log(formData)
    toast.success("Saved Successfully!");
  }

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
              name="fullName"
              label={<span>Name <span style={{ color: 'red' }}>*</span></span>}
              value={formData.fullName}
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="email"
              label={<span>Email <span style={{ color: 'red' }}>*</span></span>}
              value={formData.email}
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="age"
              label={<span>Age <span style={{ color: 'red' }}>*</span></span>}
              value={formData.age}
              variant="outlined"
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="gender"
              label={<span>Gender <span style={{ color: 'red' }}>*</span></span>}
              value={formData.gender}
              variant="outlined"
              select
              fullWidth
              onChange={handleInputChange}
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
              name="country"
              label={<span>Country <span style={{ color: 'red' }}>*</span></span>}
              value={formData.country}
              variant="outlined"
              select
              fullWidth
              onChange={handleInputChange}
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
              name="language"
              label={<span>Language <span style={{ color: 'red' }}>*</span></span>}
              value={formData.language}
              variant="outlined"
              select
              fullWidth
              onChange={handleInputChange}
            >
              {languages.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {/* <Grid item xs={12} sm={12}>
            <TextField
              name="interval"
              value={formData.interval}
              label={<span>Interval <span style={{ color: 'red' }}>*</span></span>}
              variant="outlined"
              select
              fullWidth
              onChange={handleInputChange}
            >
              {interval.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
              </MenuItem>
              ))}
            </TextField>
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
