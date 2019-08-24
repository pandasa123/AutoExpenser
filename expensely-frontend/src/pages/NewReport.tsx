import React, { useContext, useState } from 'react';
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
import {
  StorageURL,
  ServiceURL,
  ContainerURL,
  BlobURL,
  BlockBlobURL,
  Aborter,
  Credential,
  Pipeline,
  AnonymousCredential
} from '@azure/storage-blob';

registerPlugin(FilePondPluginFileEncode);
registerPlugin(FilePondPluginImagePreview);

interface IDataTypes {
  accountID: string;
  tripName: string | undefined;
  startDate: DateType | null;
  endDate: DateType | null;
  files: string[];
  startingLocation: string | undefined;
  mainLocation: string | undefined;
}

interface INewReportType {
  accountIdentifer: string;
}

const containerName = 'test-expensely';

const anonymousCredential: Credential = new AnonymousCredential();

const pipeline: Pipeline = StorageURL.newPipeline(anonymousCredential);

const serviceURL: ServiceURL = new ServiceURL(
  `https://expensely.blob.core.windows.net/?sv=2018-03-28&ss=b&srt=sco&sp=rwdlac&se=2019-09-24T19:54:43Z&st=2019-08-24T11:54:43Z&spr=https&sig=L%2FLe0M%2FlkBEt3bofM17O9g8sowtE2ypUE%2Fatvh91yr0%3D`,
  pipeline
);

const containerURL: ContainerURL = ContainerURL.fromServiceURL(
  serviceURL,
  containerName
);

let tripName: string = '';
let startDateValue: DateType = new Date();
let endDateValue: DateType = new Date();
let fileNames: string[] = [];
let startingLocation: string = '';
let mainLocation: string = '';

const NewReport = ({ accountIdentifer }: INewReportType) => {
  const [receiptDumpVisibile, setReceiptDumpVisibile] = useState(false);

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

  const checkData = () => {
    const data: IDataTypes = {
      accountID: accountIdentifer,
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
    setReceiptDumpVisibile(true);
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
            tripName = value!;
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
              startingLocation = value!;
            }}
          />
        </div>
        <TextField
          label="Event Location"
          placeholder="Airport or City"
          required
          onChange={(e: React.FormEvent, value: string | undefined) => {
            mainLocation = value!;
          }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingTop: '32px'
        }}
      >
        <PrimaryButton onClick={checkData}>
          Next Step: Upload Receipts
        </PrimaryButton>
      </div>
      <div style={{ display: receiptDumpVisibile ? 'block' : 'none' }}>
        <div style={{ paddingTop: '32px' }}>
          <FilePond
            labelIdle={'Drag & Drop Receipts (JPEG only)'}
            allowMultiple
            acceptedFileTypes={['image/jpeg']}
            onupdatefiles={files => handleFiles(files)}
            server={{
              process: async (
                fieldName,
                file,
                metadata,
                load,
                error,
                progress,
                abort
              ) => {
                const blobURL = BlobURL.fromContainerURL(
                  containerURL,
                  file.name
                );
                const blockBlobURL = BlockBlobURL.fromBlobURL(blobURL);
                const uploadBlobResponse = await blockBlobURL.upload(
                  Aborter.none,
                  file,
                  file.size
                );
                load(uploadBlobResponse.requestId!);
              }
            }}
            instantUpload={false}
          />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingTop: '32px'
          }}
        >
          <PrimaryButton>Finish and Submit Trip</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default NewReport;
