/*
  # Fix habits table column names

  1. Changes
    - Rename columns to match TypeScript types:
      - start_date -> startDate
      - completed_dates -> completedDates

  This ensures consistency between the database schema and application code.
*/

ALTER TABLE habits
  RENAME COLUMN start_date TO "startDate";

ALTER TABLE habits
  RENAME COLUMN completed_dates TO "completedDates";