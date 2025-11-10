import { useLanguage } from '../../context/LanguageContext';

interface FocusControlsProps {
  isFocusing: boolean;
  onStartFocus: (duration: number) => void;
  onStopFocus?: () => void;
  todaySessions: number;
  dailyGoal: number;
  focusDuration: number;
  onDurationChange: (duration: number) => void;
  remainingSeconds: number;
}

const FOCUS_DURATIONS = [5, 10, 25, 30, 45, 60];

export default function FocusControls({ 
  isFocusing, 
  onStartFocus,
  onStopFocus, 
  todaySessions, 
  dailyGoal,
  focusDuration,
  onDurationChange,
  remainingSeconds
}: FocusControlsProps) {
  const { t } = useLanguage();
  const progressPercentage = (todaySessions / dailyGoal) * 100;
  
  // Format remaining time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };
  
  return (
    <div>
      {/* Focus Duration Selection */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Focus Duration
        </label>
        <div className="grid grid-cols-3 gap-2">
          {FOCUS_DURATIONS.map((duration) => (
            <button
              key={duration}
              onClick={() => onDurationChange(duration)}
              disabled={isFocusing}
              className={`py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                focusDuration === duration
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              } ${isFocusing ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
            >
              {duration} min
            </button>
          ))}
        </div>
      </div>

      {!isFocusing ? (
        <button
          onClick={() => onStartFocus(focusDuration)}
          className="w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-white text-lg font-semibold shadow-lg mb-6 transition-all bg-emerald-500 hover:bg-emerald-600 hover:shadow-xl hover:scale-[1.02]"
        >
          <span className="text-2xl">⏰</span>
          <span className="text-xl">Start {focusDuration}-Minute Focus</span>
        </button>
      ) : (
        <div className="space-y-3 mb-6">
          {/* Timer Display */}
          <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl p-4 border-2 border-emerald-300">
            <div className="text-center">
              <p className="text-sm font-medium text-emerald-700 mb-2">Focusing...</p>
              <p className="text-4xl font-bold text-emerald-900 font-mono">
                {formatTime(remainingSeconds)}
              </p>
              <p className="text-xs text-emerald-600 mt-1">Time Remaining</p>
            </div>
          </div>
          
          {/* Stop Button */}
          {onStopFocus && (
            <button
              onClick={onStopFocus}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-red-700 bg-red-50 border-2 border-red-200 text-sm font-semibold hover:bg-red-100 hover:border-red-300 transition-all"
            >
              <span>End Session Early</span>
            </button>
          )}
        </div>
      )}

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
