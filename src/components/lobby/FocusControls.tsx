import { useLanguage } from '../../context/LanguageContext';

interface FocusControlsProps {
  isFocusing: boolean;
  onStartFocus: () => void;
  catDialogue: string;
  todaySessions: number;
  dailyGoal: number;
}

export default function FocusControls({ isFocusing, onStartFocus, catDialogue, todaySessions, dailyGoal }: FocusControlsProps) {
  const { t } = useLanguage();
  const progressPercentage = (todaySessions / dailyGoal) * 100;
  
  return (
    <div>
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 mb-6 border-2 border-emerald-200 relative">
        <div className="absolute -top-3 left-6 bg-white px-3 py-1 rounded-full border-2 border-emerald-200">
          <span className="text-sm font-bold text-emerald-700">Jobbo Cat 说：</span>
        </div>
        <p className="text-center text-lg text-slate-700 mt-2">"{catDialogue}"</p>
      </div>

      <button
        onClick={onStartFocus}
        disabled={isFocusing}
        className={`w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-white text-lg font-semibold shadow-lg mb-6 transition-all ${
          isFocusing ? 'bg-emerald-400 opacity-70 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600 hover:shadow-xl hover:scale-[1.02]'
        }`}
      >
        <span className="text-2xl">⏰</span>
        <span className="text-xl">
          {isFocusing ? t('lobby.focus.button.focusing') : t('lobby.focus.button.start')}
        </span>
      </button>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-700">{t('lobby.focus.progress')}</span>
          <span className="font-bold text-emerald-600">{todaySessions} / {dailyGoal} 次</span>
        </div>
        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
        {todaySessions >= dailyGoal && (
          <div className="text-center py-2 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-300">
            <span className="text-yellow-700 font-bold">{t('lobby.focus.complete')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
