import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import apiCall from 'src/utils/api';
import { useSelector } from 'react-redux';

const socialMediaOptions = [
  { value: 'facebook_page', label: 'Facebook Page' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook_group', label: 'Facebook Group' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'tiktok', label: 'Tiktok' },
  { value: 'youtube', label: 'Youtube' },
];

export default function ShopProductCard({ product }) {
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [postImmediately, setPostImmediately] = useState('now');
  const [scheduledDate, setScheduledDate] = useState('');
  const [authUser, setAuthUser] = useState({});

  const user = useSelector((state) => state.auth.user);
  

  useEffect(() => {
    setAuthUser(user);
  }, [user]);

  const handleOpenPostDialog = () => {
    setOpenPostDialog(true);
  };

  const handleClosePostDialog = () => {
    setOpenPostDialog(false);
  };

  const handleOpenViewDialog = () => {
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  const handleMediaChange = (event) => {
    setSelectedMedia(event.target.value);
  };

  const handlePostChange = (event) => {
    setPostImmediately(event.target.value);
  };

  const handlePostSubmit = () => {
    // Submit the form here
    handlePostSubmissionRequest();
    handleClosePostDialog();
  };

  const PaperComponent = (props) => {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  };

  const handlePostSubmissionRequest = async () => {
    try {
      console.log('Post Submission Request', product);
      const uri = `${import.meta.env.VITE_BASE_BACKEND_URL}client/account/post`;

      let postingTime = '';
      let isNow = true;

      if (postImmediately === 'schedule') {
        postingTime = scheduledDate;
        isNow = false;
      } else {
        postingTime = new Date();
      }

      const response = await apiCall('POST', uri, {
        post_id: product.id,
        postingData: product,
        postingAccounts: selectedMedia,
        isNow: isNow,
        postingTime: postingTime,
        user_id: authUser._id,
        user: authUser,
      });

      console.log('Post Submission Response', response);
    } catch (error) {
      console.error('Error during post submission', error);
    }
  };
  const media = product.imagePath;
  const renderImg =
    media.endsWith('.mp4') || media.endsWith('.webm') ? (
      <Box
        component="video"
        src={media}
        sx={{
          top: 0,
          width: 1,
          height: 1,
          objectFit: 'cover',
          position: 'absolute',
        }}
        autoPlay
        muted
        loop
      />
    ) : (
      <Box
        component="img"
        src={media}
        sx={{
          top: 0,
          width: 1,
          height: 1,
          objectFit: 'cover',
          position: 'absolute',
        }}
      />
    );

  const renderActions = (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
      className="action-buttons"
    >
      <Button variant="contained" size="small" color="info" onClick={handleOpenViewDialog}>
        View
      </Button>
      {/* <Button variant="contained" size="small" color="primary" onClick={handleOpenPostDialog}>
        Post
      </Button> */}
    </Stack>
  ); 

  return (
    <> 
      <Card
        sx={{
          position: 'relative',
          '&:hover .action-buttons': {
            opacity: 1,
          },
        }}
      >
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {renderImg}
          {renderActions}
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
            {`Account Name: ${product.accountName}`}
          </Link>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1"> {`Status: ${product.status}`}</Typography>
          </Stack>
        </Stack>
      </Card>




      <Dialog
        PaperComponent={PaperComponent}
        open={openViewDialog}
        onClose={handleCloseViewDialog}
        maxWidth="sm"
        fullWidth
        sx={{
          backgroundColor: '#1e1e2d', // Dark background for a modern look
          color: '#fff', // White text color
          borderRadius: '12px', // Rounded corners
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)', // Glassy shadow
          backdropFilter: 'blur(10px)', // Subtle blur for the dialog
        }}
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontSize: '1.5rem', // Slightly larger title
            fontWeight: 'bold',
            color: '#f5a623', // Accent color for the title
            paddingBottom: '10px',
          }} 
        > 
          Post Details
        </DialogTitle>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            padding: '24px', // Increased padding for spacing
            color: '#b0b0b0', // Light gray for content text
          }}
        >
          {product.imagePath.endsWith('.mp4') || product.imagePath.endsWith('.webm') ? (
            <Box
              component="video"
              src={product.imagePath}
              sx={{
                width: '80%',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)', // Softer shadow
                mb: 2,
                border: '2px solid #f5a623', // Border around the video
              }}
              autoPlay
              muted
              loop
            />
          ) : (
            <Box
              component="img"
              src={product?.imagePath}
              sx={{
                width: '80%',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)', // Softer shadow
                mb: 2,
                border: '2px solid #f5a623', // Border around the image
              }}
            />
          )}

          <Typography
            variant="body2"
            sx={{
              fontSize: '0.75rem',
              textAlign: 'left',
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: '#2b2b3c',
              border: '1px solid #f5a623',
            }}
          >
            {`User Name: ${product?.userName.toUpperCase()}`}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.75rem',
              textAlign: 'left',
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: '#2b2b3c',
              border: '1px solid #f5a623',
            }}
          >
            {`Media Type: ${product?.platform.toUpperCase()}`}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.75rem',
              textAlign: 'left',
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: '#2b2b3c',
              border: '1px solid #f5a623',
            }}
          >
            {`Account Title: ${product?.accountName.toUpperCase()}`}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.75rem',
              textAlign: 'left',
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              backgroundColor: '#2b2b3c',
              border: '1px solid #f5a623',
            }}
          >
            {`Status: ${product?.status.toUpperCase()}`}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            paddingBottom: '16px',
          }}
        >
          <Button
            onClick={handleCloseViewDialog}
            color="primary"
            sx={{
              fontSize: '0.875rem',
              color: '#fff',
              backgroundColor: '#f5a623',
              '&:hover': {
                backgroundColor: '#e69e1e', // Darker shade on hover
              },
              padding: '8px 24px',
              borderRadius: '8px',
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>


{/* Posting Dialog */}
      <Dialog
        PaperComponent={PaperComponent}
        open={openPostDialog}
        onClose={handleClosePostDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontSize: '1.25rem',
            fontWeight: 'bold',
          }}
        >
          Posting to media account
        </DialogTitle>
        <DialogContent
          sx={{
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <FormControl fullWidth margin="normal">
            <InputLabel id="social-media-select-label">Select Social Media</InputLabel>
            <Select
              labelId="social-media-select-label"
              multiple
              value={selectedMedia}
              onChange={handleMediaChange}
              renderValue={(selected) => selected.join(', ')}
            >
              {socialMediaOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Checkbox checked={selectedMedia.includes(option.value)} />
                  <ListItemText primary={option.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl component="fieldset" margin="normal">
            <RadioGroup value={postImmediately} onChange={handlePostChange}>
              <FormControlLabel value="now" control={<Radio />} label="Post now" />
              <FormControlLabel value="schedule" control={<Radio />} label="Schedule post" />
            </RadioGroup>
          </FormControl>
          {postImmediately === 'schedule' && (
            <TextField
              fullWidth
              label="Choose Posting Date and Time"
              type="datetime-local"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
          )}
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            paddingBottom: '16px',
          }}
        >
          <Button onClick={handleClosePostDialog} color="primary" sx={{ fontSize: '0.875rem' }}>
            Close
          </Button>
          <Button
            onClick={handlePostSubmit}
            color="primary"
            variant="contained"
            sx={{ fontSize: '0.875rem' }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
