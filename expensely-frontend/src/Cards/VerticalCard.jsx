import React from 'react'
import { Card } from '@uifabric/react-cards'
import {
    Text,
    FontWeights,
    ActionButton
} from 'office-ui-fabric-react'


const alertClicked = (): void => {
    alert('Clicked')
}

const VerticalCard = ({ month, day, title, subtitle, airport, numItems = 0, numAccepted = 0, backgroundImageURL = 'https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2532&q=80' }) => {

    const cardTokens: ICardTokens = { childrenMargin: 12 }

    const backgroundImageCardSectionTokens: ICardSectionTokens = { padding: 12 }
    const agendaCardSectionTokens: ICardSectionTokens = { childrenGap: 0 }
    const attendantsCardSectionTokens: ICardSectionTokens = { childrenGap: 6 }

    const descriptionTextStyles: ITextStyles = {
        root: {
            color: '#333333',
            fontWeight: FontWeights.semibold
        }
    }

    let borderColour = '#F3F2F1'
    if (numAccepted === numItems) {
        borderColour = '#107c10'
    } else if (numAccepted === 0 && numItems > 0) {
        borderColour = '#d83b01'
    } else if (numAccepted < numItems) {
        borderColour = '#ffaa44'
    }

    const footerCardSectionStyles: ICardSectionStyles = {
        root: {
            borderTop: '1px solid ' + borderColour,
            paddingTop: '8px'
        }
    }
    const backgroundImageCardSectionStyles: ICardSectionStyles = {
        root: {
            backgroundImage: 'url(' + backgroundImageURL + ')',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            height: 144
        }
    }
    const dateTextStyles: ITextStyles = {
        root: {
            // color: '#505050',
            color: '#FFF',
            fontWeight: 600
        }
    }
    const subduedTextStyles: ITextStyles = {
        root: {
            color: '#666666'
        }
    }
    const actionButtonStyles: IButtonStyles = {
        root: {
            border: 'none',
            color: '#333333',
            height: 'auto',
            minHeight: 0,
            minWidth: 0,
            padding: 0,

            selectors: {
                ':hover': {
                    color: '#0078D4'
                }
            }
        },
        textContainer: {
            fontSize: 12,
            fontWeight: FontWeights.semibold
        }
    }

    return (
        <Card onClick={alertClicked} tokens={cardTokens} style={{ backgroundColor: '#FAF9F8', minWidth: '286px', minHeight: '323px' }}>
            <Card.Section
                fill
                verticalAlign="end"
                styles={backgroundImageCardSectionStyles}
                tokens={backgroundImageCardSectionTokens}
            >
                <Text variant="large" styles={dateTextStyles}>
                    {month}
                </Text>
                <Text variant="superLarge" styles={dateTextStyles}>
                    {day}
                </Text>
            </Card.Section>
            <Card.Section>
                <Text variant="small" styles={subduedTextStyles}>
                    {subtitle}
                </Text>
                <Text styles={descriptionTextStyles}>
                    {title}
                </Text>
            </Card.Section>
            <Card.Section tokens={agendaCardSectionTokens}>
                <Text variant="small" styles={descriptionTextStyles}>
                    {numItems} Expensed Items
				</Text>
                <Text variant="small" styles={subduedTextStyles}>
                    {airport}
                </Text>
            </Card.Section>
            <Card.Item grow={1}>
                <span />
            </Card.Item>
            <Card.Section
                horizontal
                tokens={attendantsCardSectionTokens}
                styles={footerCardSectionStyles}
            >
                <ActionButton
                    text={numAccepted + " Accepted"}
                    styles={actionButtonStyles}
                />
                <ActionButton
                    text={(numItems - numAccepted) + " Denied"}
                    styles={actionButtonStyles}
                />
            </Card.Section>
        </Card >
    )
}

export default VerticalCard