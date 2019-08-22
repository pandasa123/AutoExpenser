import React, { useContext } from 'react'
import { Text, DefaultButton, Toggle, TooltipHost } from 'office-ui-fabric-react';
import b2cauth from 'react-azure-adb2c'
import ThemeContext from '../utils/ThemeContext'

const HeaderStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '24px',
    paddingRight: '24px',
    backgroundColor: '#0078D4',
    justifyContent: 'space-between',
    height: '72px'
}

const ControlStyle = {
    display: 'flex',
    alignItems: 'baseline'
}

const logoTextStyle: ITextStyles = {
    root: {
        fontWeight: 600,
        color: '#FFFFFF'
    }
}

const Header = () => {
    const themeObject = useContext(ThemeContext)

    return (
        <div style={HeaderStyle}>
            <Text variant="xLarge" styles={logoTextStyle}>
                Expensely
            </Text>
            <div style={ControlStyle}>
                <TooltipHost
                    content="Toggle for Dark Mode"
                    id={'ToggleToolTip'}
                    calloutProps={{ gapSpace: 0 }}
                    styles={{ root: { display: 'inline-block' } }}
                >
                    <Toggle
                        defaultChecked={themeObject.theme === 'dark'}
                        onChange={() => themeObject.toggleTheme(themeObject.theme)}
                    />
                </TooltipHost>
                <DefaultButton onClick={b2cauth.signOut} style={{ marginLeft: '16px' }}>Logout</DefaultButton>
            </div>
        </div >
    )
}

export default Header