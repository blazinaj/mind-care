/*
  # Create assessments table

  1. New Tables
    - `assessments`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `answers` (jsonb)
      - `status` (text)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `assessments` table
    - Add policies for authenticated users to:
      - Create their own assessments
      - Read their own assessments
*/

CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  answers jsonb NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  user_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create their own assessments"
  ON assessments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own assessments"
  ON assessments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);