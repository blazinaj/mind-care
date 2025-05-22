/*
  # Add workflow status tracking

  1. Changes
    - Add workflow_status column to assessments table
    - Add workflow_updated_at column to track status changes
    - Set default workflow status

  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE assessments 
ADD COLUMN IF NOT EXISTS workflow_status text NOT NULL DEFAULT 'assessment_completed',
ADD COLUMN IF NOT EXISTS workflow_updated_at timestamptz DEFAULT now();

COMMENT ON COLUMN assessments.workflow_status IS 'Current status in the treatment workflow: assessment_completed, provider_matching, provider_matched, appointment_scheduled, treatment_started';