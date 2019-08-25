export interface IDashboardTypes {
  accountIdentifer: string;
}

export interface IDataInputType {
  PartitionKey: string;
  approved: number;
  start_date: string;
  end_date: string;
  starting_location: string;
  main_location: string;
  total: any;
  items: any;
  status: string;
}

export const monthNames: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];