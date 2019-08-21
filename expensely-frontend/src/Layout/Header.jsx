import React from 'react'
import { Text, Button } from 'office-ui-fabric-react';
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

const logoTextStyle: ITextStyles = {
    root: {
        fontWeight: 600
    }
}

const Header = () => {
    return (
        <div style={HeaderStyle}>
            <Text variant="xLarge" styles={logoTextStyle}>
                Expensely
            </Text>
            <Button style={{ marginLeft: 'auto' }} onClick={b2cauth.signOut}>Logout</Button>
        </div>
    )
}

export default Header