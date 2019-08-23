import React, { useContext } from 'react';
import {
  Text,
  TextField,
  ITextStyles,
  DatePicker,
  DayOfWeek,
  IDatePickerStrings,
  PrimaryButton
} from 'office-ui-fabric-react';
import { ThemeContext } from '../utils/ThemeContext';
// import FileUpload from '../FileUpload';
import { FilePond, registerPlugin, File } from 'react-filepond';
// @ts-ignore
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// @ts-ignore
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(FilePondPluginFileEncode);
registerPlugin(FilePondPluginImagePreview);

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

type DateType = Date | null | undefined;

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

  let tripName: string | undefined = '';
  let startDateValue: DateType = null;
  let endDateValue: DateType = null;
  let fileNames: string[] = [];

  const submitData = () => {
    const data = {
      tripName: tripName,
      startDate: startDateValue,
      endDate: endDateValue,
      files: fileNames
    };
    console.log(data);
  };

  const handleFiles = (files: File[]) => {
    fileNames = files.map(files => files.file.name);
  };

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
      <div style={{ paddingTop: '16px' }}>
        <TextField
          label="Trip Name"
          placeholder="New Report Name"
          required
          onChange={(e: React.FormEvent, value: string | undefined) => {
            tripName = value;
          }}
        />
      </div>
      <div style={{ display: 'flex', paddingTop: '16px' }}>
        <div style={{ marginRight: '12px' }}>
          <DatePicker
            label="Start date"
            isRequired
            firstDayOfWeek={DayOfWeek.Sunday}
            strings={DayPickerStrings}
            value={startDateValue!}
            onSelectDate={(date: DateType) => {
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
          onSelectDate={(date: DateType) => {
            endDateValue = date;
          }}
        />
      </div>
      <div style={{ paddingTop: '32px' }}>
        <FilePond
          labelIdle={'Drag & Drop Receipts (JPEG only)'}
          allowMultiple
          acceptedFileTypes={['image/jpeg']}
          onupdatefiles={files => handleFiles(files)}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: '32px'
        }}
      >
        <PrimaryButton onClick={submitData}>
          Finish and Submit Trip
        </PrimaryButton>
      </div>
    </div>
  );
};

export default NewReport;
