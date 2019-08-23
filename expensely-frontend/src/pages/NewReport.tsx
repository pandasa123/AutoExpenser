import React, { useContext } from 'react';
import {
  Text,
  TextField,
  ITextStyles,
  DatePicker,
  DayOfWeek,
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

import { DayPickerStrings, DateType } from '../utils/DayPickerUtils';

registerPlugin(FilePondPluginFileEncode);
registerPlugin(FilePondPluginImagePreview);

interface IDataTypes {
  tripName: string | undefined;
  startDate: DateType | null;
  endDate: DateType | null;
  files: string[];
  startingLocation: string | undefined;
  mainLocation: string | undefined;
}

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
  let startingLocation: string | undefined = '';
  let mainLocation: string | undefined = '';

  const submitData = () => {
    const data: IDataTypes = {
      tripName: tripName,
      startingLocation: startingLocation,
      mainLocation: mainLocation,
      startDate: startDateValue,
      endDate: endDateValue,
      files: fileNames
    };

    if (data.tripName === '') {
      alert('Trip Name is required.');
      return;
    } else if (data.startDate === null) {
      alert('Start Date is required.');
      return;
    } else if (data.endDate === null) {
      alert('End Date is required.');
      return;
    } else if (data.startingLocation === '') {
      alert('Starting Location is required.');
      return;
    } else if (data.mainLocation === '') {
      alert('Main Location is required.');
      return;
    }
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
      <div style={{ display: 'flex', paddingTop: '16px' }}>
        <div style={{ marginRight: '12px' }}>
          <TextField
            label="Starting Location"
            placeholder="Airport or City"
            required
            onChange={(e: React.FormEvent, value: string | undefined) => {
              startingLocation = value;
            }}
          />
        </div>
        <TextField
          label="Event Location"
          placeholder="Airport or City"
          required
          onChange={(e: React.FormEvent, value: string | undefined) => {
            mainLocation = value;
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
