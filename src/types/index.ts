export interface Trip {
  id: string;
  destination: string;
  dates: string;
}

export interface MonthData {
  name: string;
  trips: Trip[];
  additionalValue: number;
  clubValue?: number;
  templateValue?: number;
}

export type MonthName = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 
  'July' | 'August' | 'September' | 'October' | 'November' | 'December';

export type PriorityLevel = 'high' | 'medium' | 'low';

export interface Goal {
  id: string;
  title: string;
  priority: PriorityLevel;
  completed: boolean;
}

export type SubscriptionCategory = 'entertainment' | 'utilities' | 'services' | 'other';

export interface Subscription {
  id: string;
  name: string;
  amount: number;
  category: SubscriptionCategory;
  active: boolean;
}

export type HabitFrequency = 'daily' | 'weekly';

export interface Habit {
  id: string;
  title: string;
  description?: string;
  frequency: HabitFrequency;
  startDate: string;
  completedDates: string[];
  active: boolean;
  category: string;
  notes: DailyNote[];
}

export interface DailyNote {
  date: string;
  content: string;
}