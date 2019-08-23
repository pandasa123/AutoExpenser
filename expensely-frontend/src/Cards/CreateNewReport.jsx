import React from 'react'
import { Card } from '@uifabric/react-cards'
import {
    Text,
    FontWeights
} from 'office-ui-fabric-react'


const CreateNewReport = () => {

    const cardTokens: ICardTokens = { childrenMargin: 12 }

    const descriptionTextStyles: ITextStyles = {
        root: {
            color: '#333333',
            fontWeight: FontWeights.semibold
        }
    }

    const subduedTextStyles: ITextStyles = {
        root: {
            color: '#666666'
        }
    }

    const CardStyle = {
        backgroundColor: '#eff6fc', minWidth: '286px', minHeight: '323px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center'
    }

    return (
        <Card tokens={cardTokens} style={CardStyle}>
            <Card.Section>
                <Text variant="large" styles={descriptionTextStyles}>
                    Create New Report
                </Text>
                <Text variant="small" styles={subduedTextStyles}>
                    Expense Your Trip's Receipts
                </Text>
            </Card.Section>
        </Card >
    )
}

export default CreateNewReport