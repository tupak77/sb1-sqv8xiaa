/*
  # Enable public access
  
  1. Changes
    - Drop existing RLS policies
    - Create new public access policies
    - Remove user_id constraints
  
  2. Security
    - Enable public read/write access
    - Remove authentication requirements
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can manage their own months" ON months;
DROP POLICY IF EXISTS "Users can manage their own trips" ON trips;
DROP POLICY IF EXISTS "Users can manage their own goals" ON goals;
DROP POLICY IF EXISTS "Users can manage their own subscriptions" ON subscriptions;

-- Create new public access policies
CREATE POLICY "Public access for months"
  ON months FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public access for trips"
  ON trips FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public access for goals"
  ON goals FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public access for subscriptions"
  ON subscriptions FOR ALL
  USING (true)
  WITH CHECK (true);

-- Make user_id nullable and remove foreign key constraints
ALTER TABLE months
  ALTER COLUMN user_id DROP NOT NULL,
  DROP CONSTRAINT IF EXISTS months_user_id_fkey;

ALTER TABLE trips
  ALTER COLUMN user_id DROP NOT NULL,
  DROP CONSTRAINT IF EXISTS trips_user_id_fkey;

ALTER TABLE goals
  ALTER COLUMN user_id DROP NOT NULL,
  DROP CONSTRAINT IF EXISTS goals_user_id_fkey;

ALTER TABLE subscriptions
  ALTER COLUMN user_id DROP NOT NULL,
  DROP CONSTRAINT IF EXISTS subscriptions_user_id_fkey;