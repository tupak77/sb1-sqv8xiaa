/*
  # Add notes column to habits table

  1. Changes
    - Add JSONB column 'notes' to store daily notes
    - Default to empty array
    - Allow null values for backward compatibility

  2. Notes
    - Using JSONB for flexible note storage
    - Each note will have { date: string, content: string }
*/

ALTER TABLE habits
ADD COLUMN notes JSONB DEFAULT '[]'::jsonb;

-- Add comment explaining the notes structure
COMMENT ON COLUMN habits.notes IS 'Array of daily notes. Each note has format: { date: string, content: string }';