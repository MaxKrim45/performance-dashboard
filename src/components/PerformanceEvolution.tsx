import { memo } from 'react';
import { TrendingUp, Calendar } from 'lucide-react';
import { MonthlyPerformance } from '../types/database';

interface PerformanceEvolutionProps {
  performances: MonthlyPerformance[];
  onUpdatePerformance: (id: string, updates: Partial<MonthlyPerformance>) => void;
}

export const PerformanceEvolution = memo(function PerformanceEvolution({ performances, onUpdatePerformance }: PerformanceEvolutionProps) {
  return (
    <div className="mb-12 md:mb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 md:mb-8">
        <div className="p-2.5 md:p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl md:rounded-2xl shadow-lg">
          <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Évolution Performance</h2>
          <p className="text-gray-500 text-xs md:text-sm mt-1">Suivi mensuel de ta progression</p>
        </div>
      </div>

      <div className="grid gap-4 md:gap-6">
        {performances.sort((a, b) => a.month_number - b.month_number).map((perf) => (
          <div
            key={perf.id}
            className="bg-white rounded-xl md:rounded-2xl border-2 border-gray-200 p-4 md:p-6 hover:border-purple-300 hover:shadow-lg transition-all"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 mb-4 md:mb-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg">
                  <Calendar className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900">{perf.month}</div>
                  <div className="text-xs md:text-sm text-gray-500">2026</div>
                </div>
              </div>

              <div className="flex-1 w-full sm:w-auto">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Score de performance
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={perf.score || ''}
                    onChange={(e) => onUpdatePerformance(perf.id, { score: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                    min="0"
                    max="30"
                    className="w-20 px-3 md:px-4 py-2 md:py-2.5 border-2 border-gray-200 rounded-lg md:rounded-xl bg-white font-bold text-purple-700 text-lg md:text-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
                  />
                  <span className="font-bold text-gray-600 text-lg md:text-xl">/ 30</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Niveau atteint
                </label>
                <input
                  type="text"
                  value={perf.level}
                  onChange={(e) => onUpdatePerformance(perf.id, { level: e.target.value })}
                  placeholder="Ex: Expert confirmé"
                  className="w-full px-3 md:px-4 py-2 md:py-2.5 border-2 border-gray-200 rounded-lg md:rounded-xl bg-white font-bold text-gray-900 text-sm md:text-base focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Ventes additionnelles
                </label>
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base md:text-lg">🚗</span>
                    <input
                      type="number"
                      value={perf.additional_sales_car || ''}
                      onChange={(e) => onUpdatePerformance(perf.id, { additional_sales_car: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                      className="w-14 md:w-16 px-2 py-2 md:py-2.5 border-2 border-gray-200 rounded-lg md:rounded-xl bg-white font-bold text-gray-900 text-sm md:text-base focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
                    />
                    <span className="text-gray-600 font-semibold text-sm md:text-base">%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base md:text-lg">🔧</span>
                    <input
                      type="number"
                      value={perf.additional_sales_mech || ''}
                      onChange={(e) => onUpdatePerformance(perf.id, { additional_sales_mech: parseInt(e.target.value) || 0 })}
                      placeholder="0"
                      className="w-14 md:w-16 px-2 py-2 md:py-2.5 border-2 border-gray-200 rounded-lg md:rounded-xl bg-white font-bold text-gray-900 text-sm md:text-base focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
                    />
                    <span className="text-gray-600 font-semibold text-sm md:text-base">%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                  Top 3 KPI
                </label>
                <input
                  type="text"
                  value={perf.top_kpis}
                  onChange={(e) => onUpdatePerformance(perf.id, { top_kpis: e.target.value })}
                  placeholder="Ex: Mandats, Conversion, Délai"
                  className="w-full px-3 md:px-4 py-2 md:py-2.5 border-2 border-gray-200 rounded-lg md:rounded-xl bg-white font-semibold text-gray-900 text-sm md:text-base focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                  A améliorer
                </label>
                <input
                  type="text"
                  value={perf.to_improve}
                  onChange={(e) => onUpdatePerformance(perf.id, { to_improve: e.target.value })}
                  placeholder="Ex: Note Google, Capture avis"
                  className="w-full px-3 md:px-4 py-2 md:py-2.5 border-2 border-gray-200 rounded-lg md:rounded-xl bg-white font-semibold text-gray-900 text-sm md:text-base focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all placeholder-gray-400"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
