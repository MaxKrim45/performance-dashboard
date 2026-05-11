-- Cleanup Duplicate RLS Policies
DROP POLICY IF EXISTS "Authenticated users can read KPI values" ON kpi_values;
DROP POLICY IF EXISTS "Authenticated users can insert KPI values" ON kpi_values;
DROP POLICY IF EXISTS "Authenticated users can update KPI values" ON kpi_values;
DROP POLICY IF EXISTS "Authenticated users can read checklist items" ON checklist_items;
DROP POLICY IF EXISTS "Authenticated users can insert checklist items" ON checklist_items;
DROP POLICY IF EXISTS "Authenticated users can update checklist items" ON checklist_items;
DROP POLICY IF EXISTS "Authenticated users can read alert items" ON alert_items;
DROP POLICY IF EXISTS "Authenticated users can insert alert items" ON alert_items;
DROP POLICY IF EXISTS "Authenticated users can update alert items" ON alert_items;
DROP POLICY IF EXISTS "Authenticated users can read monthly objectives" ON monthly_objectives;
DROP POLICY IF EXISTS "Authenticated users can insert monthly objectives" ON monthly_objectives;
DROP POLICY IF EXISTS "Authenticated users can update monthly objectives" ON monthly_objectives;
DROP POLICY IF EXISTS "Authenticated users can read monthly performance" ON monthly_performance;
DROP POLICY IF EXISTS "Authenticated users can insert monthly performance" ON monthly_performance;
DROP POLICY IF EXISTS "Authenticated users can update monthly performance" ON monthly_performance;
