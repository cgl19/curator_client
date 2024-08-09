import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import apiCall from 'src/utils/api';
import { styled } from '@mui/material/styles';
import { FormControlLabel } from '@mui/material';
import { Switch } from '@mui/material'; 
import Iconify from 'src/components/iconify';
import { Tooltip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { ColorRing } from 'react-loader-spinner';



const privacyOptions = [  
  { value: 'SELF_ONLY', label: 'Private (only me)' },
  { value: 'FRIENDS', label: 'Friends' },
  { value: 'PUBLIC', label: 'Public' },
];    

const interactionOptions = [ 
  { value: 'comment', label: 'Allow Comments' },
  { value: 'duet', label: 'Allow Duet' },
  { value: 'stitch', label: 'Allow Stitch' },
];

const commercialContentOptions = [ 
  { value: 'your_brand', label: 'Your Brand' },
  { value: 'branded_content', label: 'Branded Content' },
];

const maxVideoDuration = 90; // in seconds, adjust as needed 
const SlimDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(2),
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
  '& .MuiPaper-root': {
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
  },
}));

const SlimTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
  },
}));

const CustomFileInput = styled('label')(({ theme }) => ({
  display: 'block',
  width: '100%',
  padding: theme.spacing(1),
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  cursor: 'pointer',
  '&:hover': {  
    backgroundColor: theme.palette.action.hover,
  },
  '& input': {
    display: 'none',
  },
}));


const RequiredAsterisk = styled('span')(({ theme }) => ({
  color: 'red',
  marginLeft: theme.spacing(0.5),
}));

export default function TikTokPostUpload() {
// Get user data from Redux store
  const user = useSelector((state) => state.auth.user);
  const [userAccounts,setuserAccounts]=useState();
  const [tiktokAccounts,settiktokAccounts]=useState();
  const [currentAccounts,setcurrentAccounts]=useState();
  const [accountName,setAccountName]=useState('');
  const [profilePhoto,setProfilePhoto]=useState('');
 

  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState('');
  const [privacy, setPrivacy] = useState('SELF_ONLY');
  const [interactions, setInteractions] = useState([]);
  const [commercialContent, setCommercialContent] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [postType, setPostType] = useState('video'); // 'video' or 'photo'
  const [canPost, setCanPost] = useState(true);
  const [disclosureEnabled, setDisclosureEnabled] = useState(false);
  const [complianceMessage, setComplianceMessage] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
const [loaderVisiblity, setloaderVisiblity]=useState(false);


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const fileType = file.type.split('/')[0];
        setPostType(fileType === 'video' ? 'video' : 'photo');

        if (fileType === 'video') {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = () => {
                window.URL.revokeObjectURL(video.src);
                const { duration } = video; // Destructure duration from video object
                if (duration > maxVideoDuration) {
                    alert(`Video exceeds maximum allowed duration of ${maxVideoDuration} seconds.`);
                } else {
                    setVideoFile(file);
                    setVideoPreview(URL.createObjectURL(file));
                    setInteractions([]); // Clear interactions for video
                }
            };
            video.src = URL.createObjectURL(file);
        } else {
            // For photos, simply set the file and its preview
            setVideoFile(file);
            setVideoPreview(URL.createObjectURL(file));
            setInteractions(['comment']); // Pre-select "Allow Comments" for photo
        }
    }
};
  const handleSubmit = async () => {
     setloaderVisiblity(true); //setting loader true
 
    if (!videoFile) {
      alert('Please select a file.');
      return;
    }

    if (postType === 'photo' && interactions.length === 0) {
      alert('For photo posts, only "Allow Comments" can be selected.');
      return;
    }

    if (postType === 'video' && commercialContent.length === 0) {
      alert('Please select at least one commercial content option.');
      return;
    }

    if (privacy === 'SELF_ONLY' && commercialContent.includes('branded_content')) {
      alert('Branded Content cannot be private.');
      return;
    }

    if (disclosureEnabled && commercialContent.length === 0) {
      alert('You need to indicate if your content promotes yourself, a third party, or both.');
      return;
    }

    // Perform the upload and TikTok post creation here
    try {
      const formData = new FormData();
      formData.append('user_id',user._id); 
      formData.append('file', videoFile);
      formData.append('title', title);
      formData.append('privacy', privacy);
      formData.append('interactions', interactions);
      formData.append('commercialContent', commercialContent);
      const uri=`${import.meta.env.VITE_BASE_BACKEND_URL}tiktokMedia`;
      const response = await apiCall('POST',uri, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Upload successful:', response);
      
     // handleClose();
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const checkPostingCapability = async () => {
    // Mock API call to check if the user can post
    const response = await apiCall('GET', 'your-api-endpoint/tiktok/check-capability');
    setCanPost(response.canPost);
  };

  const getUserAccountDetail=async()=>{
    // Mock API call to get user account details
    const uri=`${import.meta.env.VITE_BASE_BACKEND_URL}getUserAccounts`;
    const response = await apiCall('POST', uri,{
      id:user._id
    });
    if(response.accounts){
      console.log(response.accounts)
      setuserAccounts(response.accounts); //array of objects
      setAccountName(response.accounts[0]?.name)
      setProfilePhoto(response.accounts[0]?.avatarUrl)
      return;
    }
    else{
      setuserAccounts([]);
      setAccountName('')
      setProfilePhoto('')
      return;
    }
  }

  useEffect(() => {
   getUserAccountDetail();
    checkPostingCapability();
  }, []);

  useEffect(() => {
    if (disclosureEnabled) {
      if (commercialContent.includes('your_brand') && commercialContent.includes('branded_content')) {
        setComplianceMessage(
          <span xs={{'marginTop':3}}>
            By posting, you agree to 
            <a style={{ color: 'red', marginLeft:'2px',marginRight:2 }} href="https://www.tiktok.com/legal/page/global/bc-policy/en" target="_blank" rel="noopener noreferrer">
              TikTok's Branded Content Policy
            </a>
            and 
            <a style={{ color: 'red', marginLeft:'2px' }} href="https://www.tiktok.com/legal/page/global/music-usage-confirmation/en" target="_blank" rel="noopener noreferrer">
              TikTok's Music Usage Confirmation
            </a>
            .
          </span>
        );
      } else if (commercialContent.includes('your_brand')) {
        setComplianceMessage(
          <span>
            By posting, you agree to 
            <a style={{ color: 'red', marginLeft:'2px' }} href="https://www.tiktok.com/legal/page/global/music-usage-confirmation/en" target="_blank" rel="noopener noreferrer">
              TikTok's Music Usage Confirmation
            </a>
            .
          </span>
        );      } else if (commercialContent.includes('branded_content')) {
        setComplianceMessage(  <span>
          By posting, you agree to 
          <a style={{ color: 'red',marginLeft:'2px' }} href="https://www.tiktok.com/legal/page/global/bc-policy/en" target="_blank" rel="noopener noreferrer">
            TikTok's Branded Content Policy
          </a>
          and 
          <a style={{ color: 'red',marginLeft:'2px' }} href="https://www.tiktok.com/legal/page/global/music-usage-confirmation/en" target="_blank" rel="noopener noreferrer">
            TikTok's Music Usage Confirmation
          </a>
          .
        </span>);
      }
    }
  }, [disclosureEnabled, commercialContent]);

  const handleDisclosureToggle = () => {
    setDisclosureEnabled(prev => !prev);
    if (!disclosureEnabled) {
      setComplianceMessage('');
    }
  };

  const handlePrivacyChange = (event) => {
    const newPrivacy = event.target.value;
    if (newPrivacy === 'SELF_ONLY' && commercialContent.includes('branded_content')) {
      setCommercialContent(prev => prev.filter(option => option !== 'branded_content'));
      alert('Branded Content visibility cannot be set to private. Your privacy setting will be automatically switched to Public.');
      setPrivacy('PUBLIC');
    } else {
      setPrivacy(newPrivacy);
    }
  };

  if (!canPost) {
    return (
      <Typography variant="body1" color="error" sx={{ p: 2 }}>
        You have reached your posting limit for today. Please try again later.
      </Typography>
    );
  }

  // Get user data from Redux store
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgb(255,154,104) 100%)',
        p: 2,
      }}
    >

 
      <Box
        sx={{
          width: '100%',
          maxWidth: '100%',
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          p: 3,
          '@media (max-width:600px)': {
            maxWidth: '100%',
            p: 1,
          },
        }}
      >
        <form>
          <Typography sx={{ color: '#1877f2' }} variant="h6" textAlign="center" gutterBottom>
            Post to TikTok
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
              {profilePhoto && (
                <Box
                  component="img"
                  src={profilePhoto}
                  alt="Profile"
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              )}
              {accountName && <Typography variant="subtitle1">{accountName}</Typography>}
            </Stack>
  
            <Box sx={{ borderRadius: '5px', boxShadow: '2px 2px 2px 2px #b2b2b2' }}>
              <Typography sx={{ fontSize: 13, marginLeft: 2 }}>
                Post Title <RequiredAsterisk>*</RequiredAsterisk>
              </Typography>
              <TextField
                placeholder="Enter title and tags"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
              />
            </Box>
  
            <FormControl fullWidth margin="normal" sx={{ boxShadow: '2px 2px 2px 2px #b2b2b2', borderRadius: '5px' }}>
              <Typography sx={{ fontSize: 13, marginBottom: 2, marginLeft: 2 }}>
                Privacy <RequiredAsterisk>*</RequiredAsterisk>
              </Typography>
              <Select value={privacy} onChange={handlePrivacyChange} fullWidth>
                {privacyOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
  
            <FormControl fullWidth margin="normal">
              <Box sx={{ my: 1, boxShadow: '2px 2px 2px 2px #b2b2b2', borderRadius: '5px' }}>
                <Switch
                  checked={disclosureEnabled}
                  onChange={handleDisclosureToggle}
                />
                <Typography sx={{ mx: 2, fontSize: 13 }} variant="body2" color="textSecondary">
                  Disclose Commercial Content <RequiredAsterisk>*</RequiredAsterisk>
                </Typography>
              </Box>
  
              <Box sx={{ my: 1, boxShadow: '2px 2px 2px 2px #b2b2b2', borderRadius: '5px' }}>
                {commercialContentOptions.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Switch
                        sx={{ fontSize: 13, marginLeft: 1 }}
                        checked={commercialContent.includes(option.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCommercialContent([...commercialContent, option.value]);
                          } else {
                            setCommercialContent(commercialContent.filter((value) => value !== option.value));
                          }
                        }}
                        disabled={!disclosureEnabled}
                      />
                    }
                    label={<span style={{ fontSize: 13 }}>{option.label}</span>}
                  />
                ))}
              </Box>
  
              {disclosureEnabled && commercialContent.length === 0 && (
                <Typography variant="body2" color="error" sx={{ mt: 1, mx: 1 }}>
                  You need to indicate if your content promotes yourself, a third party, or both.
                </Typography>
              )}
              {commercialContent.includes('your_brand') && (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mx: 1 }}>
                  Your photo/video will be labeled as <span style={{ color: 'rgb(24,119,242)' }}>'Promotional content'</span>.
                </Typography>
              )}
              {commercialContent.includes('branded_content') && (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1, mx: 1 }}>
                  Your photo/video will be labeled as <span style={{ color: 'rgb(24,119,242)' }}>'Paid partnership'</span>.
                </Typography>
              )}
            </FormControl>
  
            <Box sx={{ boxShadow: '2px 2px 2px 2px #b2b2b2', borderRadius: '5px' }}>
              <InputLabel sx={{ fontSize: 13, marginBottom: 2, marginLeft: 2 }}>
                Interactions <RequiredAsterisk>*</RequiredAsterisk>
              </InputLabel>
              <FormControl fullWidth margin="normal">
                <Stack direction="row" spacing={2}>
                  {interactionOptions.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      control={
                        <Checkbox
                          checked={interactions.includes(option.value)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setInteractions([...interactions, option.value]);
                            } else {
                              setInteractions(interactions.filter((value) => value !== option.value));
                            }
                          }}
                          disabled={postType === 'photo' && option.value !== 'comment'}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </Stack>
              </FormControl>
            </Box>
  
            {videoPreview && (
              <Box sx={{ width: '100%', mt: 2, maxHeight: 600, border: '1px solid', borderColor: 'divider', boxShadow: '2px 2px 2px 2px #b2b2b2', borderRadius: '5px' }}>
                {postType === 'video' ? (
                  <video
                    src={videoPreview}
                    controls
                    style={{ width: '100%', borderRadius: 2 }}
                  />
                ) : (
                  <Box
                    component="img"
                    src={videoPreview}
                    sx={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 2, boxShadow: '5px 5px 5px 5px #b2b2b2', border: '1px solid', borderColor: 'divider' }}
                  />
                )}
              </Box>
            )}
  
            <CustomFileInput>
              <input
                type="file"
                accept="video/*,image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                
                
              />
              <Box sx={{ marginTop: 5, textAlign: 'center' }}>
                <Iconify sx={{ boxShadow: '2px 2px 5px 5px #b2b2b2', borderRadius: 5, border: '3px solid #fe2c55' }} icon="eva:upload-fill" color="rgb(24,119,242)" size="48px" height="40px" width="40px" />
                <Typography sx={{ fontSize: 13, my: 1 }}>{videoFile ? 'Change' : 'Upload'}</Typography>
              </Box>
            </CustomFileInput>
  
            {complianceMessage && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                {complianceMessage}
              </Typography>
            )}
  
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                sx={{
                  color: 'white',
                  bgcolor: '#1877f2',
                  marginBottom: '15px',
                  borderRadius: 0,
                  boxShadow: '2px 2px 2px 2px #b2b2b2',
                  border: '1px solid',
                  '&:hover': {
                    bgcolor: '#1877f2',
                  },
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
  
              {disclosureEnabled && commercialContent.length === 0 ? (
                <Tooltip title="To disclose commercial content, you must enable 'Your Brand,' 'Branded Content,' or both." placement="top">
                  <span>
                    <Button
                      sx={{
                        boxShadow: '2px 2px 2px 2px #b2b2b2',
                        border: '1px solid',
                        marginBottom: '15px',
                        color: 'white',
                        bgcolor: "#fe2c55",
                        borderRadius: 0,
                      }}
                      variant="contained"
                      disabled
                    >
                      Publish
                    </Button>
                  </span>
                </Tooltip>
              ) : (
                <Button
                  onClick={handleSubmit}
                  sx={{
                    boxShadow: '2px 2px 2px 2px #b2b2b2',
                    border: '1px solid',
                    marginBottom: '15px',
                    color: 'white',
                    bgcolor: "#fe2c55",
                    borderRadius: 0,
                  }}
                  type="button"
                  variant="contained"
                  disabled={disclosureEnabled && commercialContent.length === 0}
                >
                  Publish
                </Button>
              )}
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

// TikTokPostUpload.propTypes = {
//   user: PropTypes.shape({
//     nickname: PropTypes.string.isRequired,
//     profilePic: PropTypes.string.isRequired,
//   }).isRequired,
// };
