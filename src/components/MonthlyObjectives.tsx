import { memo } from 'react';
import { Target, Check } from 'lucide-react';
import { MonthlyObjective } from '../types/database';

interface MonthlyObjectivesProps {
  objectives: MonthlyObjective[];
  onUpdateObjective: (id: string, updates: Partial<MonthlyObjective>) => void;
}

export const MonthlyObjectives = memo(function MonthlyObjectives({ objectives, onUpdateObjective }: MonthlyObjectivesProps) {
  const completedCount = objectives.filter(obj => obj.is_completed).length;

  return (
    <div className="mb-12 md:mb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 md:mb-8">
        <div className="p-2.5 md:p-3 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl md:rounded-2xl shadow-lg">
          <Target className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Objectifs du Mois</h2>
          <p className="text-gray-500 text-xs md:text-sm mt-1">Tes 3 priorités SMART</p>
        </div>
        <div className="text-right">
          <div className="text-xl md:text-2xl font-bold text-gray-900">{completedCount}/3</div>
          <div className="text-xs md:text-sm text-gray-500">complétés</div>
        </div>
      </div>

      <div className="grid gap-4 md:gap-6">
        {objectives.sort((a, b) => a.priority - b.priority).map((objective) => (
          <div
            key={objective.id}
            className={`rounded-xl md:rounded-2xl border-2 p-4 md:p-6 transition-all ${
              objective.is_completed
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 border-teal-600 shadow-lg'
                : 'bg-white border-gray-200 hover:border-teal-300 hover:shadow-lg'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center font-bold text-xl md:text-2xl shadow-lg ${
                  objective.is_completed
                    ? 'bg-white text-teal-600'
                    : 'bg-teal-100 text-teal-700'
                }`}>
                  {objective.priority}
                </div>
              </div>

              <div className="flex-1 grid gap-3 md:gap-4 w-full">
                <div>
                  <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                    objective.is_completed ? 'text-white/80' : 'text-gray-600'
                  }`}>
                    KPI Cible
                  </label>
                  <input
                    type="text"
                    value={objective.kpi_target}
                    onChange={(e) => onUpdateObjective(objective.id, { kpi_target: e.target.value })}
                    placeholder="Ex: Taux de conversion Lead → RDV"
                    className={`w-full px-3 md:px-4 py-2 md:py-2.5 border-2 rounded-lg md:rounded-xl font-bold text-sm md:text-base focus:outline-none focus:ring-4 transition-all ${
                      objective.is_completed
                        ? 'bg-teal-600 border-teal-600 text-white focus:ring-white/20 placeholder-white/50'
                        : 'bg-white border-gray-200 text-gray-900 focus:border-teal-500 focus:ring-teal-100 placeholder-gray-400'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                      objective.is_completed ? 'text-white/80' : 'text-gray-600'
                    }`}>
                      De
                    </label>
                    <input
                      type="text"
                      value={objective.from_value}
                      onChange={(e) => onUpdateObjective(objective.id, { from_value: e.target.value })}
                      placeholder="25%"
                      className={`w-full px-3 md:px-4 py-2 md:py-2.5 border-2 rounded-lg md:rounded-xl font-bold text-sm md:text-base focus:outline-none focus:ring-4 transition-all ${
                        objective.is_completed
                          ? 'bg-teal-600 border-teal-600 text-white focus:ring-white/20 placeholder-white/50'
                          : 'bg-white border-gray-200 text-gray-900 focus:border-teal-500 focus:ring-teal-100 placeholder-gray-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                      objective.is_completed ? 'text-white/80' : 'text-gray-600'
                    }`}>
                      Vers
                    </label>
                    <input
                      type="text"
                      value={objective.to_value}
                      onChange={(e) => onUpdateObjective(objective.id, { to_value: e.target.value })}
                      placeholder="35%"
                      className={`w-full px-3 md:px-4 py-2 md:py-2.5 border-2 rounded-lg md:rounded-xl font-bold text-sm md:text-base focus:outline-none focus:ring-4 transition-all ${
                        objective.is_completed
                          ? 'bg-teal-600 border-teal-600 text-white focus:ring-white/20 placeholder-white/50'
                          : 'bg-white border-gray-200 text-gray-900 focus:border-teal-500 focus:ring-teal-100 placeholder-gray-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                      objective.is_completed ? 'text-white/80' : 'text-gray-600'
                    }`}>
                      Deadline
                    </label>
                    <input
                      type="text"
                      value={objective.deadline}
                      onChange={(e) => onUpdateObjective(objective.id, { deadline: e.target.value })}
                      placeholder="31/01"
                      className={`w-full px-3 md:px-4 py-2 md:py-2.5 border-2 rounded-lg md:rounded-xl font-bold text-sm md:text-base focus:outline-none focus:ring-4 transition-all ${
                        objective.is_completed
                          ? 'bg-teal-600 border-teal-600 text-white focus:ring-white/20 placeholder-white/50'
                          : 'bg-white border-gray-200 text-gray-900 focus:border-teal-500 focus:ring-teal-100 placeholder-gray-400'
                      }`}
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => onUpdateObjective(objective.id, { is_completed: !objective.is_completed })}
                className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-lg md:rounded-xl border-2 flex items-center justify-center transition-all hover:scale-110 shadow-lg ${
                  objective.is_completed
                    ? 'bg-white border-white'
                    : 'bg-white border-gray-300 hover:border-teal-500'
                }`}
              >
                {objective.is_completed && <Check className="w-6 h-6 md:w-8 md:h-8 text-teal-600" strokeWidth={3} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
