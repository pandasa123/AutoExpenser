import React from 'react'
import { Text } from 'office-ui-fabric-react'

const FooterStyle = {
    backgroundColor: '#252423',
    height: '32px',
    padding: '32px',
    display: 'flex',
    alignItems: 'center'
}

const TextStyleSubdued = {
    root: {
        color: 'white'
    }
}

const TextStyleEmphasis = {
    root: {
        color: 'white',
        fontWeight: 800
    }
}

const Footer = () => {
    return (
        <div style={FooterStyle}>
            <span>
                <Text variant="mediumPlus" styles={TextStyleSubdued}>Created by </Text>
                <a href={'https://sanketpanda.com'} style={{
                    color: 'inherit',
                    textDecoration: 'inherit'
                }}
                >
                    <Text variant="mediumPlus" styles={TextStyleEmphasis}>Sanket Panda</Text>
                </a>
            </span>
        </div >
    )
}

export default Footer