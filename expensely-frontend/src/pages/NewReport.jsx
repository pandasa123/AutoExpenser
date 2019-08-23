import React from 'react'
import { Text, TextField, Calendar } from 'office-ui-fabric-react'

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
            <TextField label="Trip Name" defaultValue="New Report Name" />
            
        </div>
    )
}

export default NewReport