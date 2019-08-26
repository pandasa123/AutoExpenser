import React, { useEffect, useState } from 'react';
import CreateNewReport from '../Cards/CreateNewReport';
import VerticalCard from '../Cards/VerticalCard';
import { Link } from 'react-router-dom';
import { ordinalSuffix } from '../utils/OrdinalSuffix';
import { getTripFromTableStorage } from '../utils/getTripFromTableStorage';
import {
  IDashboardTypes,
  IDataInputType,
  monthNames
} from '../utils/DashboardHelpers';
// import { BingImageSearch } from '../utils/BingImageSearch';

const Dashboard = ({ accountIdentifer }: IDashboardTypes) => {
  const [result, setResult] = useState([]);
  useEffect(() => {
    getTripFromTableStorage(accountIdentifer).then((res: any) => {
      setResult(res);
    });
  }, [accountIdentifer]);

  const cards = [];

  if (result) {
    for (const [key, value] of Object.entries(result)) {
      const tripName: string = key;
      const values: IDataInputType = value;

      const startDate = new Date(values.start_date);
      const startDateMonth = monthNames[startDate.getMonth()];
      const startDateOrdinal = ordinalSuffix(
        parseInt(startDate.toDateString().split(' ')[2], 0)
      );

      const endDate = new Date(values.end_date);
      const endDateMonth = monthNames[endDate.getMonth()];
      const endDateOrdinal = ordinalSuffix(
        parseInt(endDate.toDateString().split(' ')[2], 0)
      );

      cards.push(
        <div style={{ margin: '12px' }} key={tripName}>
          <VerticalCard
            month={startDateMonth + ' ' + startDate.getFullYear()}
            day={startDateOrdinal}
            title={tripName}
            subtitle={
              startDateMonth +
              ' ' +
              startDateOrdinal +
              ' - ' +
              endDateMonth +
              ' ' +
              endDateOrdinal
            }
            accountIdentifer={accountIdentifer}
            mainLocation={values.main_location}
            airport={values.starting_location + ' to ' + values.main_location}
            numItems={values.items.length}
            numAccepted={values.approved}
          />
        </div>
      );
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: '32px',
        flexWrap: 'wrap'
      }}
    >
      <div style={{ margin: '12px' }}>
        <Link to="/newreport">
          <CreateNewReport />
        </Link>
      </div>
      {cards}
    </div>
  );
};

export default Dashboard;
