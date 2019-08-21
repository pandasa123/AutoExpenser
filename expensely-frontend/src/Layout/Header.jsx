import React from 'react'
import { Button } from 'office-ui-fabric-react';
import b2cauth from 'react-azure-adb2c'

const HeaderStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '16px',
    paddingRight: '16px',
    backgroundColor: '#0078D4',
    height: '72px'
}

const Header = () => {
    return (
        <div style={HeaderStyle}>
            <Button style={{ marginLeft: 'auto' }} onClick={b2cauth.signOut}>Logout</Button>
        </div>
    )
}

export default Header