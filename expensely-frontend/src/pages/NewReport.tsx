import React, { useContext } from 'react';
import { Text, TextField, ITextStyles } from 'office-ui-fabric-react';
import { ThemeContext } from '../utils/ThemeContext';

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
    </div>
  );
};

export default NewReport;
