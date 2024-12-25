import { supabase } from '../supabase';
import type { MonthData, Trip } from '../../types';
import { MONTH_NAMES } from '../../utils/months';

export async function initializeMonths() {
  const { data: existingMonths } = await supabase
    .from('months')
    .select('name');

  if (!existingMonths?.length) {
    const monthsToInsert = MONTH_NAMES.map(name => ({
      name,
      additional_value: 0,
      club_value: 0,
      template_value: 0
    }));

    const { error } = await supabase
      .from('months')
      .insert(monthsToInsert);

    if (error) throw error;
  }
}

export async function getMonths(): Promise<MonthData[]> {
  const { data: months, error: monthsError } = await supabase
    .from('months')
    .select('*')
    .order('name', { ascending: true });

  if (monthsError) throw monthsError;

  // Get trips for all months
  const { data: trips, error: tripsError } = await supabase
    .from('trips')
    .select(`
      id,
      destination,
      dates,
      month_id
    `);

  if (tripsError) throw tripsError;

  // Create a map of month_id to trips
  const tripsByMonth = trips?.reduce((acc, trip) => {
    if (!acc[trip.month_id]) {
      acc[trip.month_id] = [];
    }
    acc[trip.month_id].push({
      id: trip.id,
      destination: trip.destination,
      dates: trip.dates
    });
    return acc;
  }, {} as Record<string, any[]>) || {};

  return months.map(month => ({
    name: month.name,
    additionalValue: month.additional_value || 0,
    clubValue: month.club_value || 0,
    templateValue: month.template_value || 0,
    trips: tripsByMonth[month.id] || []
  }));
}

export async function updateMonth(name: string, data: Partial<MonthData>) {
  const updates: Record<string, any> = {};
  
  if ('clubValue' in data) {
    updates.club_value = data.clubValue;
  }
  if ('templateValue' in data) {
    updates.template_value = data.templateValue;
  }
  if ('clubValue' in data || 'templateValue' in data) {
    const clubValue = 'clubValue' in data ? data.clubValue : undefined;
    const templateValue = 'templateValue' in data ? data.templateValue : undefined;
    
    const { data: currentMonth } = await supabase
      .from('months')
      .select('club_value, template_value')
      .eq('name', name)
      .single();
    
    const finalClubValue = clubValue ?? currentMonth?.club_value ?? 0;
    const finalTemplateValue = templateValue ?? currentMonth?.template_value ?? 0;
    
    updates.additional_value = finalClubValue + finalTemplateValue;
  }

  const { error } = await supabase
    .from('months')
    .update(updates)
    .eq('name', name);

  if (error) throw error;
}

export async function addTrip(monthName: string, trip: Omit<Trip, 'id'>) {
  // First get the month id
  const { data: month } = await supabase
    .from('months')
    .select('id')
    .eq('name', monthName)
    .single();

  if (!month) throw new Error('Month not found');

  const { data, error } = await supabase
    .from('trips')
    .insert([{
      month_id: month.id,
      destination: trip.destination,
      dates: trip.dates
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function removeTrip(tripId: string) {
  const { error } = await supabase
    .from('trips')
    .delete()
    .eq('id', tripId);

  if (error) throw error;
}