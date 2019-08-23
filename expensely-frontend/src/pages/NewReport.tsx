import React, { useContext } from 'react';
import {
  Text,
  TextField,
  ITextStyles,
  DatePicker,
  DayOfWeek,
  IDatePickerStrings
} from 'office-ui-fabric-react';
import { ThemeContext } from '../utils/ThemeContext';

const DayPickerStrings: IDatePickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],

  shortMonths: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],

  days: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],

  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',

  isRequiredErrorMessage: 'Start date is required.',

  invalidInputErrorMessage: 'Invalid date format.'
};

const NewReport = () => {
  const themeObject = useContext(ThemeContext);

  let textColour = '#000';

  if (themeObject.theme === 'dark') {
    textColour = '#FFF';
  }

  const TextStyle: ITextStyles = {
    root: {
      color: textColour
    }
  };

  let startDateValue: Date | null | undefined = null;
  let endDateValue: Date | null | undefined = null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '32px',
        maxWidth: '800px'
      }}
    >
      <Text styles={TextStyle} variant="xLarge">
        Create a New Report
      </Text>
      <br />
      <TextField label="Trip Name" placeholder="New Report Name" required />
      <br />
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '12px' }}>
          <DatePicker
            label="Start date"
            isRequired
            firstDayOfWeek={DayOfWeek.Sunday}
            strings={DayPickerStrings}
            value={startDateValue!}
            onSelectDate={date => {
              startDateValue = date;
            }}
          />
        </div>
        <DatePicker
          label="End date"
          isRequired
          firstDayOfWeek={DayOfWeek.Sunday}
          strings={DayPickerStrings}
          value={endDateValue!}
          onSelectDate={date => {
            endDateValue = date;
          }}
        />
      </div>
    </div>
  );
};

export default NewReport;
