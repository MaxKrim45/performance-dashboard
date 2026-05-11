import { memo } from 'react';
import { Zap, Check } from 'lucide-react';
import { ChecklistItem } from '../types/database';

interface DailyChecklistProps {
  items: ChecklistItem[];
  onToggleItem: (id: string, isChecked: boolean) => void;
}

export const DailyChecklist = memo(function DailyChecklist({ items, onToggleItem }: DailyChecklistProps) {
  const completedCount = items.filter(item => item.is_checked).length;
  const totalCount = items.length;
  const percentage = (completedCount / totalCount) * 100;

  return (
    <div className="mb-12 md:mb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 md:mb-8">
        <div className="p-2.5 md:p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl md:rounded-2xl shadow-lg">
          <Zap className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Checklist Quotidienne</h2>
          <p className="text-gray-500 text-xs md:text-sm mt-1">15 minutes à 8h30 pour démarrer la journée</p>
        </div>
        <div className="text-right">
          <div className="text-xl md:text-2xl font-bold text-gray-900">{completedCount}/{totalCount}</div>
          <div className="text-xs md:text-sm text-gray-500">terminées</div>
        </div>
      </div>

      <div className="mb-4 md:mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5 md:h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>

      <div className="grid gap-2.5 md:gap-3">
        {items.sort((a, b) => a.display_order - b.display_order).map((item) => (
          <button
            key={item.id}
            onClick={() => onToggleItem(item.id, !item.is_checked)}
            className={`w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-lg md:rounded-xl transition-all border-2 ${
              item.is_checked
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 border-blue-600 shadow-lg'
                : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div
              className={`w-5 h-5 md:w-6 md:h-6 rounded-md md:rounded-lg flex items-center justify-center flex-shrink-0 border-2 transition-all ${
                item.is_checked
                  ? 'bg-white border-white'
                  : 'bg-white border-gray-300'
              }`}
            >
              {item.is_checked && (
                <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600" strokeWidth={3} />
              )}
            </div>
            <div className="flex-1 text-left">
              <div className={`font-semibold text-sm md:text-base ${item.is_checked ? 'text-white' : 'text-gray-900'}`}>
                {item.item_name}
              </div>
            </div>
            <div className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-md md:rounded-lg font-semibold text-xs md:text-sm ${
              item.is_checked
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {item.estimated_time}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
});
