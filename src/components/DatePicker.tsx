import * as React from 'react';
import { Calendar, DatePicker } from '@fluentui/react-date-time';
// Use @fluentui/react-date-time for the date picker
// Use @fluentui/react-components for the rest of the components

export const DatePickerExample = () => {
  const [value, setValue] = React.useState<Date | undefined>(new Date());

  return (
    <DatePicker
      label="Select a date"
      value={value}
      // onSelectDate={setValue}
      // onDismiss={() => console.log('onDismiss called')}
      placeholder="Select a date..."
      ariaLabel="Select a date"
    />
  );
};

// export const DatePickerExample = () => {
//   // An example calendar now
//   const [value, setValue] = React.useState<Date | undefined>(new Date());

//   return (
//     <Calendar value={value} onSelectDate={setValue} />
//   );
// };