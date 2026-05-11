import { Gem } from 'lucide-react';

export function AdditionalSales() {
  const scenarios = [
    {
      label: 'Faible',
      badgeClass: 'bg-red-500',
      fmr: '40% × 80€',
      warranty: '60% × 300€',
      monthlyGain: '+21 200€',
      yearlyGain: '+254 400€'
    },
    {
      label: 'Moyen',
      badgeClass: 'bg-amber-500',
      fmr: '65% × 80€',
      warranty: '80% × 300€',
      monthlyGain: '+29 200€',
      yearlyGain: '+350 400€'
    },
    {
      label: 'Cible',
      badgeClass: 'bg-green-600',
      fmr: '80% × 80€',
      warranty: '90% × 300€',
      monthlyGain: '+33 400€',
      yearlyGain: '+400 800€'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border-l-4 border-amber-500 mb-6 md:mb-8 shadow-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3 text-lg md:text-xl lg:text-2xl text-amber-600 mb-4 md:mb-6 pb-3 md:pb-4 border-b-2 border-amber-500 font-bold">
        <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
        <Gem className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
        <span className="text-base md:text-xl lg:text-2xl">SECTION SPÉCIALE : VENTES ADDITIONNELLES</span>
      </div>

      <div className="mb-4 md:mb-5 font-semibold text-gray-800 text-sm md:text-base">
        Impact financier (simulation 100 ventes/mois)
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse bg-white min-w-[600px]">
          <thead className="bg-amber-500 text-white">
            <tr>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-xs md:text-sm">SCÉNARIO</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-xs md:text-sm">TAUX FMR</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-xs md:text-sm">TAUX GARANTIE</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-xs md:text-sm">GAIN MENSUEL</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left font-semibold text-xs md:text-sm">GAIN ANNUEL</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((scenario, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-amber-50 transition-colors"
              >
                <td className="px-2 md:px-4 py-2 md:py-3">
                  <span className={`inline-block px-2 md:px-3 py-0.5 md:py-1 rounded-full text-white text-xs md:text-sm font-semibold ${scenario.badgeClass}`}>
                    {scenario.label}
                  </span>
                </td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-gray-700 text-xs md:text-sm">{scenario.fmr}</td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-gray-700 text-xs md:text-sm">{scenario.warranty}</td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-green-600 font-bold text-sm md:text-base lg:text-lg">{scenario.monthlyGain}</td>
                <td className="px-2 md:px-4 py-2 md:py-3 text-green-600 font-bold text-sm md:text-base lg:text-lg">{scenario.yearlyGain}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gradient-to-br from-amber-100 to-amber-200 border-l-4 border-amber-500 p-3 md:p-5 rounded-lg mt-4 md:mt-5 font-semibold text-amber-900 text-sm md:text-base">
        Différentiel Faible vers Cible : +12 200€/mois soit +146 400€/an !
      </div>
    </div>
  );
}
