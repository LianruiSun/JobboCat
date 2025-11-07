import type { Language } from '../context/LanguageContext';

export type Translations = Record<string, string>;

// Lazy load translation modules
export const loadTranslations = async (lang: Language): Promise<Translations> => {
  switch (lang) {
    case 'en':
      return (await import('./en')).default;
    case 'es':
      return (await import('./es')).default;
    case 'ja':
      return (await import('./ja')).default;
    case 'ko':
      return (await import('./ko')).default;
    case 'zh-CN':
      return (await import('./zhCN')).default;
    case 'zh-TW':
      return (await import('./zhTW')).default;
    default:
      return (await import('./en')).default;
  }
};
