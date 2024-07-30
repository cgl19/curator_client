import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function AppWidgetSummary({ title, icon, sx, ...other }) {
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
      
      <Stack spacing={0.5} alignItems="center">
        {icon && <Box sx={{ width: 64, height: 64 }}>{icon}</Box>}
        <Typography variant="h6" sx={{ textAlign: 'center' }}>{title}</Typography>
        
        <Button
  variant="outlined"
  color="inherit"
  startIcon={<Iconify icon="eva:plus-fill" />}
  sx={{
    borderColor: 'inherit',
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
      borderColor: 'inherit',
    },
  }}
>
  Connect
</Button>
      </Stack>
    </Card>
  );
}

AppWidgetSummary.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
};
