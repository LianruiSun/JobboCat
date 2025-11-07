import { useLanguage } from '../../context/LanguageContext';
import CatMiniAvatar from './CatMiniAvatar';
import type { CharacterParts } from '../../types/character';

export interface OtherUser {
  id: number;
  username: string;
  focusMinutes: number;
  character: CharacterParts;
  description?: string; // User's custom status/description
}

interface OthersFocusingListProps {
  users: OtherUser[];
}

export default function OthersFocusingList({ users }: OthersFocusingListProps) {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 flex flex-col" style={{ maxHeight: '48%' }}>
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="text-xl">👥</span>
          {t('lobby.others.title')}
        </h2>
      </div>
      <div className="overflow-y-auto p-4 space-y-3">
        {users.map((u) => (
          <div key={u.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
            <CatMiniAvatar char={u.character} />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 truncate max-w-[140px]">{u.username}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  {u.focusMinutes} {t('lobby.others.minutes')}
                </span>
              </div>
              {u.description && (
                <p className="text-xs text-slate-500 mt-1">{u.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
