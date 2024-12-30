export function toUTCDateString(date: Date): string {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    .toISOString()
    .split('T')[0];
}

export function createUTCDate(year: number, month: number, day: number): string {
  return new Date(Date.UTC(year, month, day))
    .toISOString()
    .split('T')[0];
}