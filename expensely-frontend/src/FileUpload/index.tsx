import React from 'react';
import { FilePond, registerPlugin, File } from 'react-filepond';
// @ts-ignore
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// @ts-ignore
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

registerPlugin(FilePondPluginFileEncode);
registerPlugin(FilePondPluginImagePreview);

const handleFiles = (files: File[]) => {
  const fileNames = files.map(files => files.file.name);
  console.log(fileNames);
};

const FileUpload: React.FC = (getFileNames: any) => {
  return (
    <FilePond
      labelIdle={'Drag & Drop Receipts (JPEG only)'}
      allowMultiple
      acceptedFileTypes={['image/jpeg']}
      onupdatefiles={files => handleFiles(files)}
    />
  );
};

export default FileUpload;
