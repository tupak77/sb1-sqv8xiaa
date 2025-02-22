export function calculateBestStreak(dates: string[], startDate: Date): number {
  if (dates.length === 0) return 0;

  // Filter dates to only include those after the start date
  const validDates = dates
    .filter(date => new Date(date) >= startDate)
    .sort();

  if (validDates.length === 0) return 0;

  let bestStreak = 0;
  let currentStreak = 1;

  for (let i = 1; i < validDates.length; i++) {
    const currentDate = new Date(validDates[i]);
    const prevDate = new Date(validDates[i - 1]);
    const diffTime = Math.abs(currentDate.getTime() - prevDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      currentStreak++;
      bestStreak = Math.max(bestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return Math.max(bestStreak, currentStreak);
}