import React from 'react'
import {
    PrimaryButton,
    DocumentCard,
    DocumentCardDetails,
    DocumentCardTitle
} from 'office-ui-fabric-react'


const Card = ({ title, status }) => {
    let background = '#C5E2F9'
    if (status === 'Approved') {
        background = '#DFF6DD'
    } else if (status === 'Incomplete') {
        background = '#FFF4CE'
    } else if (status === 'Not Reviewed') {
        background = '#FEB2B2'
    }


    const CardStyle = {
        backgroundColor: background,
        color: 'black',
        width: '128px',
        height: '128px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }

    return (
        <DocumentCard style={CardStyle}>
            <DocumentCardDetails>
                <DocumentCardTitle
                    title={title}
                    shouldTruncate
                />
            </DocumentCardDetails>
        </DocumentCard>
    )
}

export default Card