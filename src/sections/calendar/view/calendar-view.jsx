import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Container from '@mui/material/Container';
import {Stack, Typography, Grid, Box } from '@mui/material';
export default function CalendarView() {
  return (
    <Container maxWidth="xl">
       <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Calenddar</Typography>
      </Stack>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={[
          { title: 'بِسْمِ ٱللَّٰهِ,', date: '2024-07-04' },
          { title: 'اللہ تعالیٰ کی رحمت کی پہلی نیشانی یہ ہے', date: '2024-07-10' },
          { title: 'ذکر الٰہی', date: '2024-07-15' }
          // Add more events as needed
        ]}
      />
    </Container>
  );
} 
