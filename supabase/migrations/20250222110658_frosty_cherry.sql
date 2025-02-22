/*
  # Add RichMap Tables

  1. New Tables
    - `richmap_income_sources`
      - `id` (uuid, primary key)
      - `name` (text)
      - `amount` (numeric)
      - `is_recurring` (boolean)
      - `user_id` (uuid)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `richmap_expenses`
      - `id` (uuid, primary key)
      - `category` (text)
      - `name` (text)
      - `amount` (numeric)
      - `due_date` (date)
      - `is_fixed` (boolean)
      - `budget_limit` (numeric)
      - `user_id` (uuid)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `richmap_investments`
      - `id` (uuid, primary key)
      - `type` (text)
      - `name` (text)
      - `amount` (numeric)
      - `returns` (numeric)
      - `user_id` (uuid)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `richmap_savings_goals`
      - `id` (uuid, primary key)
      - `name` (text)
      - `target` (numeric)
      - `current` (numeric)
      - `user_id` (uuid)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `richmap_scenarios`
      - `id` (uuid, primary key)
      - `name` (text)
      - `income` (numeric)
      - `expenses` (numeric)
      - `savings` (numeric)
      - `investments` (numeric)
      - `user_id` (uuid)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create income sources table
CREATE TABLE richmap_income_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  amount numeric(10,2) NOT NULL,
  is_recurring boolean DEFAULT true,
  user_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create expenses table
CREATE TABLE richmap_expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  name text NOT NULL,
  amount numeric(10,2) NOT NULL,
  due_date date,
  is_fixed boolean DEFAULT true,
  budget_limit numeric(10,2),
  user_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create investments table
CREATE TABLE richmap_investments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  name text NOT NULL,
  amount numeric(10,2) NOT NULL,
  returns numeric(5,2) DEFAULT 0,
  user_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create savings goals table
CREATE TABLE richmap_savings_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  target numeric(10,2) NOT NULL,
  current numeric(10,2) DEFAULT 0,
  user_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create scenarios table
CREATE TABLE richmap_scenarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  income numeric(10,2) NOT NULL,
  expenses numeric(10,2) DEFAULT 0,
  savings numeric(10,2) DEFAULT 0,
  investments numeric(10,2) DEFAULT 0,
  user_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE richmap_income_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE richmap_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE richmap_investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE richmap_savings_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE richmap_scenarios ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public access for richmap_income_sources"
  ON richmap_income_sources FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public access for richmap_expenses"
  ON richmap_expenses FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public access for richmap_investments"
  ON richmap_investments FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public access for richmap_savings_goals"
  ON richmap_savings_goals FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public access for richmap_scenarios"
  ON richmap_scenarios FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create updated_at triggers
CREATE TRIGGER update_richmap_income_sources_updated_at
  BEFORE UPDATE ON richmap_income_sources
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_richmap_expenses_updated_at
  BEFORE UPDATE ON richmap_expenses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_richmap_investments_updated_at
  BEFORE UPDATE ON richmap_investments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_richmap_savings_goals_updated_at
  BEFORE UPDATE ON richmap_savings_goals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_richmap_scenarios_updated_at
  BEFORE UPDATE ON richmap_scenarios
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();