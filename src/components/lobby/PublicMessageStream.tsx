import { type FormEvent, type ChangeEvent } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export interface Message {
  id: number;
  user: string;
  content: string;
  timestamp: string;
}

interface PublicMessageStreamProps {
  messages: Message[];
  messageInput: string;
  onMessageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function PublicMessageStream({ messages, messageInput, onMessageChange, onSubmit }: PublicMessageStreamProps) {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-200 flex flex-col" style={{ minHeight: '40%', flex: '1 1 auto' }}>
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span className="text-xl">💬</span>
          {t('lobby.messages.title')}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className="p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm font-bold">
                {msg.user.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-slate-900">
                    {msg.user}
                  </span>
                  <span className="text-xs text-slate-500">
                    {msg.timestamp}
                  </span>
                </div>
                <p className="text-sm text-slate-700">
                  {msg.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-200">
        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            type="text"
            value={messageInput}
            onChange={onMessageChange}
            placeholder={t('lobby.messages.placeholder')}
            className="flex-1 px-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!messageInput.trim()}
          >
            <span className="text-lg">📤</span>
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-2 text-center">
          {t('lobby.messages.hint')}
        </p>
      </div>
    </div>
  );
}
