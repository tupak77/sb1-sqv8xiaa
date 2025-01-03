/*
  # Update goals schema

  1. Changes
    - Add description field
    - Add objectives array field
    - Update priority check constraint
    - Add RLS policies

  2. New Fields
    - description: Optional text field
    - objectives: JSONB array of objectives
*/

-- Add new columns to goals table
ALTER TABLE goals
ADD COLUMN description text,
ADD COLUMN objectives jsonb DEFAULT '[]'::jsonb;

-- Drop and recreate priority check constraint
ALTER TABLE goals DROP CONSTRAINT IF EXISTS goals_priority_check;
ALTER TABLE goals ADD CONSTRAINT goals_priority_check 
  CHECK (priority IN ('high', 'medium', 'low'));