import React from 'react';
import { AppBar,Grid,Card,CardContent,TextField, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function HomePage() {
  return (
    <Box>
      {/* Top Menu with Orange Gradient */}
      <AppBar
        position="static"
        sx={{
            background: 'rgb(59,60,59)',
          color: '#fff',
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Curator 365
          </Typography>
          <Button component={Link} to="/login" color="inherit">
            Login
            </Button>
            <Button component={Link} to="/privacy-policy" color="inherit">
            Privacy Policy
            </Button>
            <Button component={Link} to="/term-condition" color="inherit">
            Terms and Conditions
            </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section with Text */}
      <Box
        sx={{
          height: '100vh',
          backgroundImage: 'url(https://img.freepik.com/free-photo/abstract-background-with-red-lines_1361-3531.jpg?t=st=1725558797~exp=1725562397~hmac=bce70ffa41751c9ac2218fbd2739dcad2d98e9f4a0ee1cf5d2a59132966232ef&w=740)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
         
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" color="white" sx={{ mb: 2 }}>
            Welcome to Curator365
          </Typography>
          <Typography variant="h5" color="white" sx={{ mb: 4 }}>
            Discover amazing content and features crafted for you
          </Typography>
          <Button
            variant="contained"
            sx={{
                background: '#F0F4F8',
                color: 'rgb(22,35,43)',
              '&:hover': {
                color: '#fff',
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Full Height Section 1 */}
      <Box
        sx={{
          height: '100vh',
          background: '#F0F4F8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          px: 2,
        }}
      >
        <Typography variant="h3" sx={{ mb: 3 }}>
          Our Mission
        </Typography>
        <Container
  maxWidth="sm"
  sx={{
    background: 'rgb(59,60,59)',
    color: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
  }}
>
  <Typography variant="h4" sx={{ mb: 4 }}>
    Why Choose Curator 365
  </Typography>

  <Typography paragraph>
    We aim to deliver the best user experience through innovation, dedication, and excellence.
    Our team is focused on providing high-quality services and solutions to meet your needs.
  </Typography>

  <Typography paragraph>
    Whether you are looking for a personalized solution or need help with existing services,
    we are here to guide you through every step with expert support and consultation.
  </Typography>

  {/* Feature Cards */}
  <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
    <Grid item xs={12} sm={6}>
      <Card
        sx={{
            background: 'linear-gradient(to right, #521C2C, #DA0920)',
            color: '#fff',
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Tailored Social Strategies
          </Typography>
          <Typography paragraph>
            Our experts create personalized social media strategies based on your goals, ensuring maximum engagement and reach.
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={6}>
      <Card
        sx={{
            background: 'linear-gradient(to right, #521C2C, #DA0920)',
            color: '#fff',
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Real-Time Analytics
          </Typography>
          <Typography paragraph>
            Gain valuable insights into your social media performance with up-to-date analytics and reports.
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={6}>
      <Card
        sx={{
            background: 'linear-gradient(to right, #521C2C, #DA0920)',
            color: '#fff',
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            24/7 Support
          </Typography>
          <Typography paragraph>
            Our dedicated support team is available around the clock to assist with any issues or questions you may have.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</Container>


      </Box>

      {/* Full Height Section 2 */}
      <Box
  sx={{
    height: '100vh',
    background: 'rgb(59,60,59)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    px: 2,
  }}
>
  <Typography variant="h3" sx={{ mb: 3, color: '#fff' }}>
    Why Choose Us?
  </Typography>

  <Container maxWidth="sm" sx={{ color: '#fff' }}>
    <Typography paragraph>
      We offer customized solutions that cater to your specific needs. Our platform is secure,
      reliable, and trusted by professionals globally. Our dedicated team of experts works around the clock
      to ensure that your experience is seamless and enjoyable.
    </Typography>
    <Typography paragraph>
      We take pride in building long-term relationships with our clients, and our support doesn't
      end with just providing a service. We work to continuously innovate and grow alongside you.
    </Typography>
  </Container>

  {/* Additional Feature Cards */}
  <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
    <Grid item xs={12} sm={4}>
      <Card
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#fff',
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Secure Platform
          </Typography>
          <Typography paragraph>
            Your data is protected with our top-notch security protocols, ensuring that your privacy and safety are always a priority.
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={4}>
      <Card
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#fff',
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Scalable Solutions
          </Typography>
          <Typography paragraph>
            As your business grows, our platform grows with you. Our scalable solutions are designed to adapt to your needs.
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={4}>
      <Card
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#fff',
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Dedicated Support
          </Typography>
          <Typography paragraph>
            Our expert support team is available 24/7 to assist you with any issues or queries you may have.
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={4}>
      <Card
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#fff',
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Global Network
          </Typography>
          <Typography paragraph>
            Our platform is trusted by professionals all over the world, giving you access to a global network of like-minded individuals.
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={4}>
      <Card
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#fff',
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Continuous Innovation
          </Typography>
          <Typography paragraph>
            We are committed to keeping our platform at the cutting edge of technology, constantly evolving to serve you better.
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={4}>
      <Card
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#fff',
          boxShadow: 3,
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Easy Integration
          </Typography>
          <Typography paragraph>
            Our platform seamlessly integrates with your existing systems and workflows, ensuring a hassle-free experience.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
</Box>
<Box
  sx={{
    background: 'rgb(59,60,59)',
    color: '#fff',
    py: 6,
    px: 4,
  }}
>
  <Container maxWidth="lg">
    <Grid container spacing={4}>
      {/* Contact Us Form */}
      <Grid item xs={12} md={6}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Contact Us
        </Typography>
        <form>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            InputLabelProps={{ style: { color: '#fff' } }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: '#fff' },
                '&:hover fieldset': { borderColor: '#FF6F59' },
              },
            }}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            InputLabelProps={{ style: { color: '#fff' } }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: '#fff' },
                '&:hover fieldset': { borderColor: '#FF6F59' },
              },
            }}
          />
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            InputLabelProps={{ style: { color: '#fff' } }}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: '#fff',
                '& fieldset': { borderColor: '#fff' },
                '&:hover fieldset': { borderColor: '#FF6F59' },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#EA9B68',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#FF6F59',
              },
            }}
          >
            Send Message
          </Button>
        </form>
      </Grid>

      {/* Footer Information and Links */}
      <Grid item xs={12} md={6}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Contact Information
        </Typography>
        <Typography paragraph>
          <strong>Address:</strong> 
            address:
            Building No. 10, Ali Haider Avenue, Ali Block, Bahria Town Phase 8, Islamabad, Pakistan
                    </Typography>
        <Typography paragraph>
          <strong>Email:</strong> contact@curator365.com
        </Typography>
        <Typography paragraph>
          <strong>Phone:</strong> +1 (123) 456-7890
        </Typography>

        <Grid container spacing={2}>
      <Grid item xs={6}>
        <Link component={Link } to="/term-conditions" underline="hover" sx={{ color: '#fff' }}>
          Terms & Conditions
        </Link>
      </Grid>
      <Grid item xs={6}>
        <Link component={Link } to="/privacy-policy" underline="hover" sx={{ color: '#fff' }}>
          Privacy Policy
        </Link>
      </Grid>
    </Grid>
      </Grid>
    </Grid>

    {/* Footer Bottom Text */}
    <Typography
      variant="body2"
      sx={{
        textAlign: 'center',
        mt: 4,
        color: '#fff',
      }}
    >
      © {new Date().getFullYear()} Curator365. All Rights Reserved.
    </Typography>
  </Container>
</Box>

</Box>

  );
}
