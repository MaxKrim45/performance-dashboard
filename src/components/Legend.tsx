export function Legend() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-4 md:p-6 rounded-xl md:rounded-2xl mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
        <div className="p-2 bg-blue-500 rounded-lg md:rounded-xl flex-shrink-0">
          <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-2 md:mb-3 text-sm md:text-base">Guide d'utilisation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-emerald-500 flex-shrink-0"></div>
              <span className="text-gray-700"><strong>Vert</strong> : Objectif atteint</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-amber-500 flex-shrink-0"></div>
              <span className="text-gray-700"><strong>Orange</strong> : Vigilance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500 flex-shrink-0"></div>
              <span className="text-gray-700"><strong>Rouge</strong> : Action immédiate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
