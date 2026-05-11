-- Add KPI History Tracking
CREATE TABLE IF NOT EXISTS kpi_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  kpi_name text NOT NULL,
  value numeric DEFAULT 0,
  value_text text DEFAULT '',
  status text CHECK (status IN ('green', 'yellow', 'red')) DEFAULT NULL,
  snapshot_date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE kpi_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own KPI history" ON kpi_history FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Managers can view all KPI history" ON kpi_history FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'manager'));
CREATE POLICY "Users can insert own KPI history" ON kpi_history FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own KPI history" ON kpi_history FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can delete own KPI history" ON kpi_history FOR DELETE TO authenticated USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_kpi_history_user_id ON kpi_history(user_id);
CREATE INDEX IF NOT EXISTS idx_kpi_history_date ON kpi_history(snapshot_date);
CREATE INDEX IF NOT EXISTS idx_kpi_history_kpi_name ON kpi_history(kpi_name);

CREATE OR REPLACE FUNCTION public.snapshot_kpi_values()
RETURNS void AS $$
BEGIN
  INSERT INTO kpi_history (user_id, kpi_name, value_text, status, snapshot_date)
  SELECT user_id, kpi_name, current_value, status, CURRENT_DATE
  FROM kpi_values
  WHERE user_id IS NOT NULL
  ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
