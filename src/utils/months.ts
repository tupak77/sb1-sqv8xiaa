import type { MonthName, MonthData } from '../types';

const MONTH_ORDER: Record<MonthName, number> = {
  'January': 0,
  'February': 1,
  'March': 2,
  'April': 3,
  'May': 4,
  'June': 5,
  'July': 6,
  'August': 7,
  'September': 8,
  'October': 9,
  'November': 10,
  'December': 11
};

export const MONTH_NAMES: MonthName[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function sortMonths(months: MonthData[]): MonthData[] {
  return [...months].sort((a, b) => MONTH_ORDER[a.name as MonthName] - MONTH_ORDER[b.name as MonthName]);
}

export function createInitialMonths(): MonthData[] {
  return MONTH_NAMES.map(name => ({
    name,
    trips: [],
    additionalValue: 0,
    clubValue: 0,
    templateValue: 0
  }));
}