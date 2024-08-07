import React,{useState} from 'react';
import { Container, ImageList, ImageListItem, Typography, Stack, Box, useMediaQuery, useTheme } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Draggable from 'react-draggable';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
const mediaData = [ 
  { id: 1, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 1' },
  { id: 2, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 2' },
  { id: 3, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 3' },
  { id: 4, type: 'image', src: '/assets/images/products/product_1.jpg', title: 'Image 4' },
  

];



export default function MediaView() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [openViewDialog, setOpenViewDialog]=useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleOpenViewDialog = (mediaId) => {
    return () => {
      setOpenViewDialog(true);
      handleSelectedMedia(mediaId);
    };
  };

  const handleSelectedMedia=(mediaId)=>{
       const  mediaRecord = mediaData.find((media) => media.id === mediaId);
       setSelectedMedia(mediaRecord.src)
       
  }
  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };
  const PaperComponent = (props) => {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  };


  return (
    <Container>
       <Dialog  PaperComponent={PaperComponent} open={openViewDialog}  maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontSize: '1.25rem',
            fontWeight: 'bold',
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
            padding: '16px',
          }}
        >
          <Box
            component="img"
            src={selectedMedia}
            sx={{
              width: '80%',
              height: 'auto',
              borderRadius: '8px',
              boxShadow: 3,
              mb: 2,
            }}
          />
          <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'medium' }}>
            {/* {product.name} */}
            Media Detail 
          </Typography>
        
        
        
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: 'center',
            paddingBottom: '16px',
          }}
        >
          <Button onClick={handleCloseViewDialog} color="primary" sx={{ fontSize: '0.875rem' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Media Library</Typography>
      </Stack>
      <ImageList variant="masonry" cols={isSmallScreen ? 1 : 4} gap={8}>
        {mediaData.map((media) => (
          <ImageListItem key={media.id}>
            {media.type === 'image' ? (
              <img
                onClick={handleOpenViewDialog(media.id)}
                src={media.src}
                alt={media.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                }}
              /> 
            ) : (
              <Box
                onClick={handleOpenViewDialog}
                component="video"
                controls
                style={{
                  width: '100%',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                }}
              >
                <source src={media.src} type="video/mp4" />
                Your browser does not support the video tag.
              </Box>
            )}
            <Typography variant="body2" color="textSecondary" component="p" align="center">
              {media.title}
            </Typography>
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
}
