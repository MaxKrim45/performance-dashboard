import { memo } from 'react';
import { Trophy, TrendingUp } from 'lucide-react';
import { KPIValue } from '../types/database';

interface PerformanceScoreProps {
  kpis: KPIValue[];
}

export const PerformanceScore = memo(function PerformanceScore({ kpis }: PerformanceScoreProps) {
  const calculateScore = () => {
    return kpis.reduce((total, kpi) => {
      if (kpi.status === 'green') return total + 2;
      if (kpi.status === 'yellow') return total + 1;
      return total;
    }, 0);
  };

  const score = calculateScore();
  const maxScore = kpis.length * 2;
  const percentage = Math.round((score / maxScore) * 100);

  const getScoreLevel = (score: number) => {
    if (score >= 27) return {
      level: 'Champion',
      icon: '🏅',
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-600',
      description: 'Excellence totale ! Tu domines ton marché.'
    };
    if (score >= 23) return {
      level: 'Expert',
      icon: '🥈',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600',
      description: 'Très performant ! Tu es presque au sommet.'
    };
    if (score >= 18) return {
      level: 'Bon pilote',
      icon: '🥉',
      color: 'amber',
      gradient: 'from-amber-500 to-orange-500',
      description: 'Satisfaisant. Continue comme ça !'
    };
    if (score >= 13) return {
      level: 'En progression',
      icon: '📚',
      color: 'orange',
      gradient: 'from-orange-500 to-red-500',
      description: 'Potentiel à exploiter. On y travaille !'
    };
    return {
      level: 'Mode urgence',
      icon: '🚨',
      color: 'red',
      gradient: 'from-red-500 to-pink-600',
      description: 'Accompagnement immédiat nécessaire.'
    };
  };

  const currentLevel = getScoreLevel(score);

  return (
    <div className="mb-12 md:mb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6 md:mb-8">
        <div className="p-2.5 md:p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl md:rounded-2xl shadow-lg">
          <Trophy className="w-6 h-6 md:w-7 md:h-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Score de Performance</h2>
          <p className="text-gray-500 text-xs md:text-sm mt-1">
            Évaluation globale de tes KPI
            <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-teal-100 text-teal-700 rounded-full text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              Temps réel
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-1">
          <div className={`bg-gradient-to-br ${currentLevel.gradient} rounded-xl md:rounded-2xl p-6 md:p-8 text-white shadow-2xl transition-all duration-500`}>
            <div className="text-5xl md:text-6xl mb-4 text-center transition-transform duration-300 hover:scale-110">{currentLevel.icon}</div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 transition-all duration-300">
                <span className="inline-block transform transition-transform duration-500 hover:scale-110">{score}</span>
                <span className="text-xl md:text-2xl opacity-80">/{maxScore}</span>
              </div>
              <div className="text-lg md:text-xl font-semibold mb-2 transition-all duration-300">{currentLevel.level}</div>
              <div className="text-white/90 text-xs md:text-sm">{currentLevel.description}</div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-center justify-between text-xs md:text-sm mb-2">
                <span>Progression</span>
                <span className="font-bold transition-all duration-300">{percentage}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2.5 md:h-3 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl md:rounded-2xl border-2 border-gray-200 p-4 md:p-6">
            <h3 className="font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-teal-600" />
              Niveaux de performance
            </h3>
            <div className="space-y-2 md:space-y-3">
              {[
                { range: '27-30 pts', level: 'Champion', color: 'emerald', desc: 'Excellence totale' },
                { range: '23-26 pts', level: 'Expert', color: 'blue', desc: 'Très performant' },
                { range: '18-22 pts', level: 'Bon pilote', color: 'amber', desc: 'Satisfaisant' },
                { range: '13-17 pts', level: 'En progression', color: 'orange', desc: 'À améliorer' },
                { range: '< 13 pts', level: 'Mode urgence', color: 'red', desc: 'Action requise' },
              ].map((item, index) => {
                const isActive = item.level === currentLevel.level;
                const borderColorClass = isActive
                  ? (item.color === 'emerald' ? 'border-emerald-300 bg-emerald-50' :
                     item.color === 'blue' ? 'border-blue-300 bg-blue-50' :
                     item.color === 'amber' ? 'border-amber-300 bg-amber-50' :
                     item.color === 'orange' ? 'border-orange-300 bg-orange-50' :
                     'border-red-300 bg-red-50')
                  : 'border-gray-100 bg-gray-50';

                const badgeColorClass =
                  item.color === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                  item.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                  item.color === 'amber' ? 'bg-amber-100 text-amber-800' :
                  item.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800';

                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 md:p-4 rounded-lg md:rounded-xl border-2 transition-all ${borderColorClass}`}
                  >
                    <div className="flex items-center gap-3 md:gap-4 flex-1">
                      <div className={`px-2 md:px-3 py-1 rounded-lg font-bold text-xs md:text-sm whitespace-nowrap ${badgeColorClass}`}>
                        {item.range}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-xs md:text-sm">{item.level}</div>
                        <div className="text-xs md:text-sm text-gray-500 truncate">{item.desc}</div>
                      </div>
                    </div>
                    {isActive && (
                      <div className="text-xl md:text-2xl ml-2">{currentLevel.icon}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl md:rounded-2xl p-3 md:p-4">
        <p className="text-xs md:text-sm text-gray-700">
          <strong>Comment calculer :</strong> Vert = 2 points · Orange = 1 point · Rouge = 0 point
        </p>
      </div>
    </div>
  );
});
