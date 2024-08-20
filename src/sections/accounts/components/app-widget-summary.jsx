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
  threedot,
  status,
  color = 'primary',
  sx,
  ...other
}) 

{
  const now = new Date();

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
            top: 16, // Adjust as needed for spacing from the top
            left: 16, // Adjust as needed for spacing from the left
            width: 24,
            height: 24,
          }}
        >
          {threedot}
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
  
        <Typography variant="h6">{title}</Typography>
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
