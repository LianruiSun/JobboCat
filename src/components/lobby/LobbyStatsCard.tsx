import { useLanguage } from '../../context/LanguageContext';

interface LobbyStatsCardProps {
  totalJobSeekers: number;
  focusingCount: number;
  onlineCount: number;
}

export default function LobbyStatsCard({ totalJobSeekers, focusingCount, onlineCount }: LobbyStatsCardProps) {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-emerald-100 sticky top-24">
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <span className="text-2xl">📊</span>
        {t('lobby.stats.title')}
      </h2>

      <div className="space-y-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">{t('lobby.stats.jobseekers')}</span>
            <span className="text-lg">👥</span>
          </div>
          <p className="text-3xl font-bold text-emerald-700">{totalJobSeekers.toLocaleString()}</p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">{t('lobby.stats.focusing')}</span>
            <span className="text-lg">🧘</span>
          </div>
          <p className="text-3xl font-bold text-purple-700">{focusingCount}</p>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">{t('lobby.stats.online')}</span>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-lg">🌐</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-amber-700">{onlineCount}</p>
        </div>
      </div>
    </div>
  );
}
