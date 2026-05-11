import { Download } from 'lucide-react';
import { exportDashboardToPDF } from '../utils/exportPDF';
import {
  KPIValue,
  ChecklistItem,
  AlertItem,
  MonthlyObjective,
  MonthlyPerformance
} from '../types/database';

interface FooterProps {
  kpis: KPIValue[];
  checklistItems: ChecklistItem[];
  alertItems: AlertItem[];
  objectives: MonthlyObjective[];
  performances: MonthlyPerformance[];
}

export function Footer({ kpis, checklistItems, alertItems, objectives, performances }: FooterProps) {
  const handleExportPDF = () => {
    exportDashboardToPDF({
      kpis,
      checklistItems,
      alertItems,
      objectives,
      performances
    });
  };

  return (
    <div className="bg-gray-100 py-6 md:py-8 px-4 md:px-8 text-center border-t border-gray-300">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex justify-center">
          <button
            onClick={handleExportPDF}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            <span>Exporter le Dashboard en PDF</span>
          </button>
        </div>

        <p className="text-gray-500 text-xs md:text-sm">
          &copy; 2026 BH CAR - Tableau de Bord Express - Tous droits réservés | Document confidentiel
        </p>
      </div>
    </div>
  );
}
