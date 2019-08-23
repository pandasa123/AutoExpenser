import React from 'react'
import { Text, Link } from 'office-ui-fabric-react'

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
                <Link href={'https://sanketpanda.com'}>
                    <Text variant="mediumPlus" styles={TextStyleEmphasis}>Sanket Panda</Text>
                </Link>
            </span>
        </div >
    )
}

export default Footer