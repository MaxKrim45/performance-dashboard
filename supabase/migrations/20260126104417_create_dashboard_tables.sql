/*
  # BH CAR Dashboard Schema

  Creates the complete database schema for the BH CAR KPI Dashboard application.
*/

CREATE TABLE IF NOT EXISTS kpi_values (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kpi_name text NOT NULL,
  kpi_category text DEFAULT '',
  target_value text NOT NULL,
  alert_value text NOT NULL,
  current_value text DEFAULT '',
  status text CHECK (status IN ('green', 'yellow', 'red')) DEFAULT NULL,
  trend text CHECK (trend IN ('up', 'down', 'stable')) DEFAULT NULL,
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS checklist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_name text NOT NULL,
  estimated_time text NOT NULL,
  is_checked boolean DEFAULT false,
  display_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS alert_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_text text DEFAULT '',
  display_order integer NOT NULL CHECK (display_order BETWEEN 1 AND 3),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS monthly_objectives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  priority integer NOT NULL CHECK (priority BETWEEN 1 AND 3),
  kpi_target text DEFAULT '',
  from_value text DEFAULT '',
  to_value text DEFAULT '',
  deadline text DEFAULT '',
  is_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS monthly_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  month text NOT NULL,
  month_number integer NOT NULL CHECK (month_number BETWEEN 1 AND 12),
  score integer DEFAULT 0,
  level text DEFAULT '',
  additional_sales_car integer DEFAULT 0,
  additional_sales_mech integer DEFAULT 0,
  top_kpis text DEFAULT '',
  to_improve text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE kpi_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE alert_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_performance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read KPI values" ON kpi_values FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can insert KPI values" ON kpi_values FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can update KPI values" ON kpi_values FOR UPDATE TO public USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can read checklist items" ON checklist_items FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can insert checklist items" ON checklist_items FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can update checklist items" ON checklist_items FOR UPDATE TO public USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can read alert items" ON alert_items FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can insert alert items" ON alert_items FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can update alert items" ON alert_items FOR UPDATE TO public USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can read monthly objectives" ON monthly_objectives FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can insert monthly objectives" ON monthly_objectives FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can update monthly objectives" ON monthly_objectives FOR UPDATE TO public USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can read monthly performance" ON monthly_performance FOR SELECT TO public USING (true);
CREATE POLICY "Anyone can insert monthly performance" ON monthly_performance FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Anyone can update monthly performance" ON monthly_performance FOR UPDATE TO public USING (true) WITH CHECK (true);
