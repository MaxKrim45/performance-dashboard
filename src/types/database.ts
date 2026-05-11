export type StatusType = 'green' | 'yellow' | 'red' | null;
export type TrendType = 'up' | 'down' | 'stable' | null;

export interface KPIValue {
  id: string;
  kpi_name: string;
  kpi_category: string;
  target_value: string;
  alert_value: string;
  current_value: string;
  status: StatusType;
  trend: TrendType;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ChecklistItem {
  id: string;
  item_name: string;
  estimated_time: string;
  is_checked: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface AlertItem {
  id: string;
  alert_text: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface MonthlyObjective {
  id: string;
  priority: number;
  kpi_target: string;
  from_value: string;
  to_value: string;
  deadline: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface MonthlyPerformance {
  id: string;
  month: string;
  month_number: number;
  score: number;
  level: string;
  additional_sales_car: number;
  additional_sales_mech: number;
  top_kpis: string;
  to_improve: string;
  created_at: string;
  updated_at: string;
}
