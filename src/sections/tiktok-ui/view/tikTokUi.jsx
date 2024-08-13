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
import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';
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
import toast from 'react-hot-toast';
import { Interaction } from '@fullcalendar/core/internal';




// main function 
export default function TikTokPostUpload() {
// Get user data from Redux store
  const user = useSelector((state) => state.auth.user);
  const tokens = useSelector((state) => state.auth.tokens);
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
  const [checkPostAccountAvailibility,setcheckPostAccountAvailibility]=useState({});
  const [openScheduleDialogue,setopenScheduleDialogue]=useState(false);
 

  const [privacyOptions,setprivacyOptions]=useState([  
    { value: 'SELF_ONLY', label: 'Private (only me)' },
    { value: 'FRIENDS', label: 'Friends' },
    { value: 'PUBLIC', label: 'Public' },
  ])

  // in seconds, adjust as needed 
  const [maxVideoDuration, setmaxVideoDuration]=useState(90)

const [interactionOptions,setInteractionOptions] = useState([  
  { value: 'comment', label: 'Allow Comments','status':false },
  { value: 'duet', label: 'Allow Duet','status':false}, 
  { value: 'stitch', label: 'Allow Stitch','status':false },
]);



const [commercialContentOptions,setcommercialContentOptions] = useState([ 
  { value: 'your_brand', label: 'Your Brand' },
  { value: 'branded_content', label: 'Branded Content' },
]);

 

//...................states declarations above..............................
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


const PaperComponent = (props) => {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
};

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
                    alert(`Video exceeds maximum allowed duration of ${maxVideoDuration/60} min.`);
                } else {
                    setVideoFile(file);
                    setVideoPreview(URL.createObjectURL(file));
                    setInteractions([]); // Clear interactions for video
                }
            };
            video.src = URL.createObjectURL(file);
        } 
        else {
            // For photos, simply set the file and its preview
            setVideoFile(file);
            setVideoPreview(URL.createObjectURL(file));
            setInteractions(['comment']); // Pre-select "Allow Comments" for photo
        }
    }
};





//checking pre posting avalibitlty of the user tiktok account
const checkPostingCapability = async () => {
  const uri = `${import.meta.env.VITE_BASE_BACKEND_URL}checkAvailability`;

  // Default values for parameters
  const userId = user?._id || null; // Use null if user._id is not available
  const accessToken = tokens?.accessToken || ''; // Use an empty string if tokens.accessToken is not available

  try {
      // Make the API call
      const response = await apiCall('POST', uri, {
          headers: { 'Content-Type': 'application/json' },
         
            userId:userId,
              accessToken:accessToken,

      });
      // Check if the response status is OK
      var responseData=await response;
      if (!responseData.status) {
          // Handle non-200 responses (e.g., 400, 404, 500)
          const errorData = responseData;
          setcheckPostAccountAvailibility({});
          throw new Error(`API Error: ${errorData.message || 'Something went wrong'}`);
      }
      // Process the successful response
      console.log('API response:', responseData?.data?.data);
      setcheckPostAccountAvailibility(responseData?.data?.data);
      console.log("posting availability",checkPostAccountAvailibility.comment_disabled)
      if(responseData?.data?.data){

        setmaxVideoDuration(responseData?.data?.data.max_video_post_duration_sec);

        setInteractionOptions([
          { value: 'comment', label: 'Allow Comments', status: responseData?.data?.data.comment_disabled },
          { value: 'duet', label: 'Allow Duet', status: responseData?.data?.data.duet_disabled },
          { value: 'stitch', label: 'Allow Stitch', status:responseData?.data?.data.stitch_disabled },
        ]);
       
        const accountPrivacy=[];
        responseData?.data?.data.privacy_level_options.map((option)=>{
             const formatedOption={
              label:option,
              value:option
             } 
             accountPrivacy.push(formatedOption);
            })
            setprivacyOptions(accountPrivacy);
      }
      else{
        console.log('responseavailibitynot found')
      }
      
     
  } 
  catch (error) {
      setcheckPostAccountAvailibility({});
  }
};


//handle submit llogic 

const handleSubmit = async () => {
   // Set loader to true

   if(!title){
    toast("Please enter title 📝")
   }
   if (!videoFile) {
    toast('Please select a media 📹');
    return;
  }
  
  if (privacy === 'SELF_ONLY' && commercialContent.includes('branded_content')) {
    toast('Branded Content cannot be private 🔒');
    return;
  }
  
  if (disclosureEnabled && commercialContent.length === 0) {
    toast('You need to indicate if your content promotes yourself, a third party, or both 🤔');
    return;
  }

  

  if (postType === 'photo' && interactions.length === 0) {
    toast('For photo posts, only "Allow Comments" can be selected 📸');
    return;
  }
  
  if (postType === 'video' && commercialContent.length === 0) {
    toast('Please select at least one commercial content option 📺');
    return;
  }
  if (postType === 'video' && interactions.length === 0) {
    toast('Please select at least one interaction ❓'); 
    return;
  }
  
 

  // Perform the upload and TikTok post creation here
  try {
  
    
    
    
    var uploadingToastId = toast.loading("Uploading to platform...",{
      position: 'top-center',
    });
   
    const accountId=userAccounts[0].accountId;
    const formData = new FormData();
    formData.append('user_id', user._id); 
    formData.append('file', videoFile);
    formData.append('title', title);
    formData.append('privacy', privacy);
    formData.append('interactions', interactions);
    formData.append('commercialContent', commercialContent);
    formData.append('accountId',accountId);
    const uri = `${import.meta.env.VITE_BASE_BACKEND_URL}tiktokMedia`;
    const response = await apiCall('POST', uri, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // Handling response
    if (response.status === "success") {
      toast.dismiss(uploadingToastId);
      toast.success("Uploaded Successfully ✔️");
      // Clear the form fields
      setVideoFile(null);
      setVideoPreview('')
      setTitle('');
      setPrivacy('');
      setInteractions([]);
      setCommercialContent([]);
      setDisclosureEnabled(false);

    } else {
      toast.dismiss(uploadingToastId);
      toast.error("Something went wrong, try again! ❌");    }
    
  } catch (error) {
    toast.dismiss(uploadingToastId);
    toast.error("Something went wrong, try again! ❌");    
  } 
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


    //handling scheduling post here

    const handleScheduleSubmit=async()=>{
       handleCloseScheduleDialog()
       handleSubmit();
    };

    const handleCloseScheduleDialog=()=>{
      setopenScheduleDialogue(false);
    }


    const handleOpenScheduleDialog=()=>{
      setopenScheduleDialogue(true);
    }
    
   

  // Get user data from Redux store
  return (
    <>
    {/* Dialog to handle the schedule Dialog */}
   
    <Dialog
      PaperComponent={PaperComponent}
      open={openScheduleDialogue}
      onClose={handleCloseScheduleDialog}
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
        Schedule for future
      </DialogTitle>
      <DialogContent
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Content goes here */}
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          padding: '16px 0',
        }}
      >

        <Button
          onClick={handleCloseScheduleDialog}
          color="primary"
          sx={{ fontSize: '0.875rem' }}
        >
          Close
        </Button>
        <Button
          onClick={handleScheduleSubmit}
          color="primary"
          variant="contained"
          sx={{ fontSize: '0.875rem' }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
    {/* Dialog to handle the schedule Dialog */}
    <Typography variant="h4">Post to TikTok</Typography>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
       
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
              {/* <Typography
              sx={{ 
                color: '#25F4EE',       // TikTok teal color
                fontSize: '1.25rem',     // Large font size
                fontWeight: 'bold'       // Make the text bold
              }} 
              variant="h4" 
              textAlign="center" 
              gutterBottom
            >
              Post to TikTok
            </Typography> */}


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
  
            <Box sx={{ borderRadius: '5px', boxShadow: ' 2px 2px #b2b2b2' }}>
              <Typography sx={{ fontSize: 13, marginLeft: 2 }}>
                Post Title <RequiredAsterisk>*</RequiredAsterisk>
              </Typography>
              <TextField
                placeholder="Enter post title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
                inputProps={{
                  style: {
                    fontSize: 15, // adjust the font size to your liking
                  },
                }}
              />
            </Box>
  
            <FormControl fullWidth margin="normal" sx={{ boxShadow: ' 2px 2px #b2b2b2', borderRadius: '5px' }}>
              <Typography sx={{ fontSize: 13, marginBottom: 2, marginLeft: 2 }}>
                Privacy <RequiredAsterisk>*</RequiredAsterisk>
              </Typography>
              <Select
            value={privacy}
            onChange={handlePrivacyChange}
            fullWidth
            renderValue={(selectedValue) => (
              <span style={{ fontSize: '10px' }}>{selectedValue}</span>
            )}
          >  
            {privacyOptions.map((option) => (
              <MenuItem key={option.value} value={option.value} sx={{ fontSize: '10px' }}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
            </FormControl>
  
            <FormControl fullWidth margin="normal">
              <Box sx={{ my: 1, boxShadow: ' 2px 2px #b2b2b2', borderRadius: '5px' }}>
                <Switch
                  checked={disclosureEnabled}
                  onChange={handleDisclosureToggle}
                />
                <Typography sx={{ mx: 2, fontSize: 13 }} variant="body2" color="textSecondary">
                  Disclose Commercial Content <RequiredAsterisk>*</RequiredAsterisk>
                </Typography>
              </Box>
  
              <Box sx={{ my: 1, boxShadow: ' 2px 2px #b2b2b2', borderRadius: '5px' }}>
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
  
            <Box sx={{ boxShadow: ' 2px 2px #b2b2b2', borderRadius: '5px' }}>
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
                        disabled={
                          (postType === 'photo' && option.value !== 'comment') ||
                          (postType === 'video' && option.status === true)
                        }
                      />
                    }
                    label={
                      <span style={{ fontSize: '13px' }}>{option.label}</span>
                    }
                  />
                ))}
              </Stack>
</FormControl>

            </Box>
  
            {videoPreview && (
              <Box sx={{ width: '100%', mt: 2, maxHeight: 600, border: '1px solid', borderColor: 'divider', boxShadow: ' 2px 2px #b2b2b2', borderRadius: '5px' }}>
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
                <Typography sx={{ fontSize: 13, my: 1 }}>Max Media Duration {maxVideoDuration/60} min</Typography>
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
                      Scedule for future
                    </Button>
                  </span>
                </Tooltip>
              ) : (
                <>
                <Button
                  onClick={handleSubmit}
                  sx={{
                    boxShadow: '2px 2px 2px 2px #b2b2b2',
                    border: '1px solid',
                    marginBottom: '15px',
                    color: 'white',
                    bgcolor: "#fe2c55",
                    borderRadius: 0,
                    mx:2
                  }}
                  type="button"
                  variant="contained"
                  disabled={disclosureEnabled && commercialContent.length === 0}
                >
                  Publish
                </Button>
                <Button
                  onClick={handleOpenScheduleDialog}
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
                  Schedule
                </Button>
                </>
              )}
            </Box>
          </Stack>
        </form>
      </Box>
    </Box>
    </>
  );
}



