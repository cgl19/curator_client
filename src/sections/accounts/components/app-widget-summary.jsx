import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Label from 'src/components/label';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
// ----------------------------------------------------------------------

export default function AppWidgetSummary({
  title,
  accessTokenExpiry,
  total,
  icon,
  status,
  color = 'primary',
  sx,
  ...other
}) {
  const now = new Date();
const formatDate = (dateString) => {
  // Parse the date string to get year, month, day, and hour
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  const hour = dateString.substring(9, 11);

  // Create a new Date object
  const date = new Date(`${year}-${month}-${day}T${hour}:00:00`);

  // Format the date using toLocaleString or toLocaleDateString
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
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
      ...sx,
    }}
    {...other}
  >
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
          top: 16,
          right: 16,
          position: 'absolute',
          textTransform: 'uppercase',
        }}
      >
        Active
      </Label>
    )}
  
    <Stack spacing={0.5} justifyContent="center" alignItems="center">
      {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}
      <Typography variant="h6">
        {title}
      </Typography>
      <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
        {accessTokenExpiry?.toLocaleString().split(':')[0].split('-').slice(0, 3)}{' '}
      </Typography>
    </Stack>
  </Card>
  
  );
}

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  status: PropTypes.bool,
};
