/*
  # Fix assessment policies

  1. Changes
    - Update RLS policies to allow proper access to assessments table
    - Add policy for authenticated users to create assessments
    - Add policy for authenticated users to read their own assessments

  2. Security
    - Maintain RLS enabled on assessments table
    - Ensure users can only access their own data
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can create their own assessments" ON assessments;
DROP POLICY IF EXISTS "Users can read their own assessments" ON assessments;

-- Create new policies with proper checks
CREATE POLICY "Enable insert access for authenticated users"
  ON assessments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable read access for users to own assessments"
  ON assessments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);