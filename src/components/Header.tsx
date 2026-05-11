import { BarChart3, Download } from 'lucide-react';
import { exportDashboardToPDF } from '../utils/exportPDF';
import {
  KPIValue,
  ChecklistItem,
  AlertItem,
  MonthlyObjective,
  MonthlyPerformance
} from '../types/database';

interface HeaderProps {
  kpis: KPIValue[];
  checklistItems: ChecklistItem[];
  alertItems: AlertItem[];
  objectives: MonthlyObjective[];
  performances: MonthlyPerformance[];
}

export function Header({ kpis, checklistItems, alertItems, objectives, performances }: HeaderProps) {
  const handleExport = () => {
    exportDashboardToPDF({
      kpis,
      checklistItems,
      alertItems,
      objectives,
      performances
    });
  };

  return (
    <div className="relative text-white py-8 md:py-12 px-4 md:px-8 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/header.png)' }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-2.5 md:p-3 bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl border border-white/20 shadow-lg">
              <BarChart3 className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight drop-shadow-lg">
                Cockpit KPI BH CAR
              </h1>
              <p className="text-teal-200 text-sm md:text-base mt-1 drop-shadow-md">
                Pilote ton agence avec clarté et performance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl border border-white/20 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline text-sm md:text-base font-semibold">Exporter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
