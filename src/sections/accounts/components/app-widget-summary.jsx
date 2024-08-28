import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Label from 'src/components/label';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import apiCall from 'src/utils/api';
import Divider from '@mui/material/Divider';
// ----------------------------------------------------------------------

export default function AppWidgetSummary({
  title,
  accessTokenExpiry,
  total,
  icon,
  threedot,
  status,
  color = 'primary',
  sx,
  onSubmit,
  getUserAccountsOnRefresh,
  account,
  ...other
}) {
  const longText = `
  Remove from platform
  `;
  const now = new Date();
  const handleSelectedPostAccount = () => {
    onSubmit();
  };
  const handleDetachedAndOthers = async () => {
    const uri = `${import.meta.env.VITE_BASE_BACKEND_URL}deleteUserAccounts`;
    const response = await apiCall('POST', uri, {
      id: account._id,
    });
    if (response.status) {
      toast.success('Account has removed from the platform');
      getUserAccountsOnRefresh();
    } else {
      toast.error('Failed to remove account from the platform');
    }
  };

  const CustomWidthTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 200,
    },
  });

  return (
    <Card
      component={Stack}
      spacing={3}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        borderRadius: 2,
        height: '100%', // Ensure the Card takes up the full height of its container
        textAlign: 'center', // Center text inside Stack
        position: 'relative', // Important for absolute positioning inside the card
        ...sx,
      }}
      {...other}
    >
      {threedot && (
        <Box
          sx={{
            position: 'absolute',
            top: 0, // Adjust as needed for spacing from the top
            left: 16, // Adjust as needed for spacing from the left
            width: 24,
            height: 24,
          }}
          onClick={handleDetachedAndOthers}
        >
          <CustomWidthTooltip title={longText}>
            <Box sx={{ '&:hover': { backgroundColor: 'rgb(239,244,242)', opacity: 6 } }}>
              {threedot}
            </Box>
          </CustomWidthTooltip>
        </Box>
      )}

      {accessTokenExpiry && accessTokenExpiry <= now ? (
        <Tooltip title="Inactive due to token expiry. Refresh the token by signing in to TikTok again.">
          <Label
            variant="filled"
            color="error"
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            Inactive
          </Label>
        </Tooltip>
      ) : (
        <Label
          variant="filled"
          color="success"
          sx={{
            zIndex: 9,
            top: 0,
            right: 16,
            position: 'absolute',
            textTransform: 'uppercase',
          }}
        >
          Active
        </Label>
      )}

      <Stack
        spacing={0.5}
        justifyContent="center"
        alignItems="center"
        onClick={handleSelectedPostAccount}
      >
        {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
          {accessTokenExpiry?.toLocaleString().split(':')[0].split('-').slice(0, 3)}{' '}
        </Typography>
        <Button>
          <Typography fontWeight="bold">Post Now</Typography>
        </Button>
      </Stack>
    </Card>
  );
}

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.object,
  total: PropTypes.number,
  status: PropTypes.bool,
};
