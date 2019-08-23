import React from 'react'
import { Text, TextField } from 'office-ui-fabric-react'

const NewReport = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '32px',
            maxWidth: '800px'
        }}>
            <Text variant="xLarge">Create a New Report</Text>
            <br />
            <TextField label="Trip Name" placeholder="New Report Name" required />
            <br />
        </div>
    )
}

export default NewReport