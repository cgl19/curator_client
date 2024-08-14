import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import TextField from '@mui/material/TextField'; // Ensure TextField is imported

export default function DateTimePickerViewRenderers({ onDateTimeChange }) {
  const [selectedDateTime, setSelectedDateTime] = React.useState(null);

  const handleDateTimeChange = (newValue) => {
    setSelectedDateTime(newValue);
    onDateTimeChange(newValue); // Notify parent component of the change
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
        <DateTimePicker
          label="With Time Clock"
          value={selectedDateTime}
          onChange={handleDateTimeChange}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
