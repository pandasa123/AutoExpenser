import React from 'react'
// import {
//     PrimaryButton,
//     DocumentCard,
//     DocumentCardDetails,
//     DocumentCardTitle
// } from 'office-ui-fabric-react'


const CreateNewReport = ({ title, status, styleProps = { size: '128px', margin: '8px' } }) => {
    let background = '#C5E2F9'
    // if (status === 'Approved') {
    //     background = '#DFF6DD'
    // } else if (status === 'Incomplete') {
    //     background = '#FFF4CE'
    // } else if (status === 'Not Reviewed') {
    //     background = '#FEB2B2'
    // } 


    const CardStyle = {
        backgroundColor: background,
        color: 'black',
        width: styleProps.size,
        height: styleProps.size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: styleProps.margin
    }

    return (
        // <DocumentCard style={CardStyle}>
        //     <DocumentCardDetails>
        //         <DocumentCardTitle
        //             title={title}
        //             shouldTruncate
        //         />
        //     </DocumentCardDetails>
        // </DocumentCard>
        <div style={CardStyle}>
            <h1 style={{ fontWeight: 400 }}>{title}</h1>
        </div>
    )
}

export default CreateNewReport