import React from 'react'
import { Text, DefaultButton } from 'office-ui-fabric-react';
import b2cauth from 'react-azure-adb2c'

const HeaderStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '24px',
    paddingRight: '24px',
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
            <DefaultButton style={{ marginLeft: 'auto' }} onClick={b2cauth.signOut}>Logout</DefaultButton>
        </div>
    )
}

export default Header