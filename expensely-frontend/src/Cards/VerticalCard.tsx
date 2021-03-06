import React, { useState } from 'react';
import {
  Card,
  ICardTokens,
  ICardSectionTokens,
  ICardSectionStyles
} from '@uifabric/react-cards';
import {
  Text,
  FontWeights,
  IconButton,
  ActionButton,
  ITextStyles,
  IButtonStyles,
  ShimmerElementsGroup,
  ShimmerElementType,
  Shimmer,
  Link
} from 'office-ui-fabric-react';
import { BingImageSearch } from '../utils/BingImageSearch';
import { archiveTripInTableStorage } from '../utils/archiveTripInTableStorage';

interface IVerticalCardTypes {
  month: string;
  day: string;
  title: string;
  subtitle: string;
  airport: string;
  numItems?: number;
  total?: number;
  approved?: number;
  status: string;
  mainLocation: string;
  accountIdentifer: string;
}

const VerticalCard = ({
  month,
  day,
  title,
  subtitle,
  airport,
  numItems = 0,
  total = 0,
  approved = 0,
  status,
  mainLocation,
  accountIdentifer
}: IVerticalCardTypes) => {
  const [backgroundImageURL, setBackgroundImageURL] = useState('');
  const cardTokens: ICardTokens = { childrenMargin: 12 };

  const backgroundImageCardSectionTokens: ICardSectionTokens = { padding: 12 };
  const agendaCardSectionTokens: ICardSectionTokens = { childrenGap: 0 };
  const attendantsCardSectionTokens: ICardSectionTokens = { childrenGap: 6 };

  const descriptionTextStyles: ITextStyles = {
    root: {
      color: '#333333',
      fontWeight: FontWeights.semibold
    }
  };

  BingImageSearch(mainLocation).then((res: any) => {
    setBackgroundImageURL(res);
  });

  let borderColour = '#F3F2F1';
  if (status === 'Not Reviewed') {
    borderColour = '#d83b01';
  } else if (status === 'Reviewed') {
    borderColour = '#107c10';
  }

  const footerCardSectionStyles: ICardSectionStyles = {
    root: {
      borderTop: '1px solid ' + borderColour,
      paddingTop: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  };
  const backgroundImageCardSectionStyles: ICardSectionStyles = {
    root: {
      backgroundImage: 'url(' + backgroundImageURL + ')',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      height: 144
    }
  };
  const dateTextStyles: ITextStyles = {
    root: {
      // color: '#505050',
      color: '#FFF',
      fontWeight: 600
    }
  };
  const subduedTextStyles: ITextStyles = {
    root: {
      color: '#666666'
    }
  };
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
  };

  return (
    <Shimmer
      isDataLoaded={backgroundImageURL !== ''}
      customElementsGroup={
        <ShimmerElementsGroup
          width={'286px'}
          height={'323px'}
          shimmerElements={[
            { type: ShimmerElementType.line, height: 323, width: 286 }
          ]}
        />
      }
    >
      <Card
        tokens={cardTokens}
        style={{
          backgroundColor: '#FAF9F8',
          minWidth: '286px',
          minHeight: '323px'
        }}
      >
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
          <Text variant="mediumPlus" styles={descriptionTextStyles}>
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
        <Card.Section
          horizontal
          tokens={attendantsCardSectionTokens}
          styles={footerCardSectionStyles}
        >
          <div>
            <ActionButton
              text={'Total: $' + total.toFixed(2)}
              styles={actionButtonStyles}
            />
            <ActionButton
              text={'Approved: $' + approved.toFixed(2)}
              styles={actionButtonStyles}
            />
          </div>
          <Link
            href="/"
            onClick={() => {
              archiveTripInTableStorage(accountIdentifer, title);
            }}
          >
            <IconButton
              iconProps={{ iconName: 'Archive' }}
              styles={actionButtonStyles}
            />
            {/* <IconButton
              iconProps={{ iconName: 'Delete' }}
              styles={actionButtonStyles}
            /> */}
          </Link>
        </Card.Section>
      </Card>
    </Shimmer>
  );
};

export default VerticalCard;
