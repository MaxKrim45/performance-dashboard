import { memo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { AlertItem } from '../types/database';

interface AlertZoneProps {
  alerts: AlertItem[];
  onUpdateAlert: (id: string, text: string) => void;
}

export const AlertZone = memo(function AlertZone({ alerts, onUpdateAlert }: AlertZoneProps) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 md:mb-8">
        <div className="p-2.5 md:p-3 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl md:rounded-2xl shadow-lg">
          <AlertTriangle className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Zone d'Alerte</h2>
          <p className="text-gray-500 text-xs md:text-sm mt-1">KPI en rouge nécessitant une action sous 48h</p>
        </div>
      </div>

      <div className="grid gap-3 md:gap-4">
        {alerts.sort((a, b) => a.display_order - b.display_order).map((alert, index) => (
          <div
            key={alert.id}
            className="bg-white rounded-xl md:rounded-2xl border-2 border-red-200 p-4 md:p-6 hover:border-red-300 hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">
                  Alerte priorité {index + 1}
                </label>
                <input
                  type="text"
                  value={alert.alert_text}
                  onChange={(e) => onUpdateAlert(alert.id, e.target.value)}
                  placeholder="Ex: Lead → RDV en dessous de 25%"
                  className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl bg-white font-semibold text-gray-900 text-sm md:text-base focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
