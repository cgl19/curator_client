import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Label from 'src/components/label';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function AppWidgetSummary({ title, total, icon, status, color = 'primary', sx, ...other }) {
  return (
    <Card
      component={Stack}
      spacing={3}
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      <Label
      variant="filled"
      color={(status === true && 'success') || 'error'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {status ? "Active" : "Inactive"}
    </Label>
      <Stack spacing={0.5} alignItems="center">
        {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}
        <Typography variant="h6" sx={{ textAlign: 'center' }}>{title}</Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.disabled', textAlign: 'center' }}>
          {(new Date()).toLocaleString().split(',')[0]}
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
