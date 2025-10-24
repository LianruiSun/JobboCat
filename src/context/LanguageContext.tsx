import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type Language = 'en' | 'es' | 'ja' | 'ko' | 'zh-CN' | 'zh-TW';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'header.title': 'JobboCat',
    'header.features': 'Features',
    'header.about': 'About',
    'header.login': 'Login',
    
    // Welcome Page
    'welcome.badge.loading': 'Loading...',
    'welcome.badge.looking': 'people looking for jobs right now',
    'welcome.badge.person': 'person',
    'welcome.badge.first': 'Be the first to join!',
    'welcome.badge.youare': "You're #",
    'welcome.early.title': 'Early Adopter!',
    'welcome.early.message': "You're one of the first 10 members! Welcome to the community! 🚀",
    'welcome.title': "You're Not Alone",
    'welcome.subtitle': 'See how many people are in the same journey. Connect, share experiences, and support each other.',
    'welcome.field.select': 'Select your field',
    'welcome.field.technology': 'Technology',
    'welcome.field.design': 'Design',
    'welcome.field.business': 'Business',
    'welcome.field.marketing': 'Marketing',
    'welcome.field.education': 'Education',
    'welcome.field.healthcare': 'Healthcare',
    'welcome.button.join': 'Join the Community',
    
    // Character Creator
    'character.title': 'Create Your Cat Character',
    'character.subtitle': 'Customize your character and join the community',
    'character.preview': 'Character Preview',
    'character.preview.placeholder': 'Select a cat to preview',
    'character.cat.type': 'Cat Type',
    'character.outfit': 'Outfit',
    'character.notselected': 'Not selected',
    'character.complete': 'Character Complete!',
    'character.button.back': '← Back',
    'character.button.join': 'Join Community →',
    
    // Cat Types
    'cat.tabby': 'Tabby Cat',
    'cat.tuxedo': 'Tuxedo Cat',
    'cat.calico': 'Calico Cat',
    'cat.siamese': 'Siamese Cat',
    'cat.ginger': 'Ginger Cat',
    'cat.white': 'White Cat',
    
    // Outfits
    'outfit.casual': 'Casual',
    'outfit.casual.desc': 'Comfy & Relaxed',
    'outfit.business': 'Business',
    'outfit.business.desc': 'Professional Look',
    'outfit.creative': 'Creative',
    'outfit.creative.desc': 'Artsy & Unique',
    'outfit.sporty': 'Sporty',
    'outfit.sporty.desc': 'Active & Energetic',
    'outfit.formal': 'Formal',
    'outfit.formal.desc': 'Elegant Style',
    'outfit.tech': 'Tech',
    'outfit.tech.desc': 'Modern & Techy',
  },
  es: {
    // Header
    'header.title': 'JobboCat',
    'header.features': 'Características',
    'header.about': 'Acerca de',
    'header.login': 'Iniciar sesión',
    
    // Welcome Page
    'welcome.badge.loading': 'Cargando...',
    'welcome.badge.looking': 'personas buscando trabajo ahora',
    'welcome.badge.person': 'persona',
    'welcome.badge.first': '¡Sé el primero en unirte!',
    'welcome.badge.youare': 'Eres #',
    'welcome.early.title': '¡Adoptador Temprano!',
    'welcome.early.message': '¡Eres uno de los primeros 10 miembros! ¡Bienvenido a la comunidad! 🚀',
    'welcome.title': 'No Estás Solo',
    'welcome.subtitle': 'Ve cuántas personas están en el mismo viaje. Conéctate, comparte experiencias y apóyense mutuamente.',
    'welcome.field.select': 'Selecciona tu campo',
    'welcome.field.technology': 'Tecnología',
    'welcome.field.design': 'Diseño',
    'welcome.field.business': 'Negocios',
    'welcome.field.marketing': 'Marketing',
    'welcome.field.education': 'Educación',
    'welcome.field.healthcare': 'Salud',
    'welcome.button.join': 'Unirse a la Comunidad',
    
    // Character Creator
    'character.title': 'Crea Tu Personaje Gato',
    'character.subtitle': 'Personaliza tu personaje y únete a la comunidad',
    'character.preview': 'Vista Previa',
    'character.preview.placeholder': 'Selecciona un gato para previsualizar',
    'character.cat.type': 'Tipo de Gato',
    'character.outfit': 'Atuendo',
    'character.notselected': 'No seleccionado',
    'character.complete': '¡Personaje Completo!',
    'character.button.back': '← Atrás',
    'character.button.join': 'Unirse →',
    
    // Cat Types
    'cat.tabby': 'Gato Atigrado',
    'cat.tuxedo': 'Gato Esmoquin',
    'cat.calico': 'Gato Calicó',
    'cat.siamese': 'Gato Siamés',
    'cat.ginger': 'Gato Naranja',
    'cat.white': 'Gato Blanco',
    
    // Outfits
    'outfit.casual': 'Casual',
    'outfit.casual.desc': 'Cómodo y Relajado',
    'outfit.business': 'Negocios',
    'outfit.business.desc': 'Look Profesional',
    'outfit.creative': 'Creativo',
    'outfit.creative.desc': 'Artístico y Único',
    'outfit.sporty': 'Deportivo',
    'outfit.sporty.desc': 'Activo y Energético',
    'outfit.formal': 'Formal',
    'outfit.formal.desc': 'Estilo Elegante',
    'outfit.tech': 'Tecnológico',
    'outfit.tech.desc': 'Moderno y Técnico',
  },
  ja: {
    // Header
    'header.title': 'JobboCat',
    'header.features': '機能',
    'header.about': '概要',
    'header.login': 'ログイン',
    
    // Welcome Page
    'welcome.badge.loading': '読み込み中...',
    'welcome.badge.looking': '人が今仕事を探しています',
    'welcome.badge.person': '人',
    'welcome.badge.first': '最初の参加者になろう！',
    'welcome.badge.youare': 'あなたは #',
    'welcome.early.title': 'アーリーアダプター！',
    'welcome.early.message': '最初の10人のメンバーの一人です！コミュニティへようこそ！🚀',
    'welcome.title': 'あなたは一人じゃない',
    'welcome.subtitle': '同じ旅をしている人の数を見てください。つながり、経験を共有し、お互いをサポートしましょう。',
    'welcome.field.select': '分野を選択',
    'welcome.field.technology': 'テクノロジー',
    'welcome.field.design': 'デザイン',
    'welcome.field.business': 'ビジネス',
    'welcome.field.marketing': 'マーケティング',
    'welcome.field.education': '教育',
    'welcome.field.healthcare': 'ヘルスケア',
    'welcome.button.join': 'コミュニティに参加',
    
    // Character Creator
    'character.title': 'キャラクターを作成',
    'character.subtitle': 'キャラクターをカスタマイズしてコミュニティに参加',
    'character.preview': 'プレビュー',
    'character.preview.placeholder': '猫を選択してプレビュー',
    'character.cat.type': '猫の種類',
    'character.outfit': '服装',
    'character.notselected': '未選択',
    'character.complete': 'キャラクター完成！',
    'character.button.back': '← 戻る',
    'character.button.join': '参加 →',
    
    // Cat Types
    'cat.tabby': 'トラ猫',
    'cat.tuxedo': 'タキシード猫',
    'cat.calico': '三毛猫',
    'cat.siamese': 'シャム猫',
    'cat.ginger': '茶トラ猫',
    'cat.white': '白猫',
    
    // Outfits
    'outfit.casual': 'カジュアル',
    'outfit.casual.desc': '快適でリラックス',
    'outfit.business': 'ビジネス',
    'outfit.business.desc': 'プロフェッショナル',
    'outfit.creative': 'クリエイティブ',
    'outfit.creative.desc': '芸術的でユニーク',
    'outfit.sporty': 'スポーティ',
    'outfit.sporty.desc': '活発でエネルギッシュ',
    'outfit.formal': 'フォーマル',
    'outfit.formal.desc': 'エレガントなスタイル',
    'outfit.tech': 'テック',
    'outfit.tech.desc': 'モダンでテクニカル',
  },
  ko: {
    // Header
    'header.title': 'JobboCat',
    'header.features': '기능',
    'header.about': '소개',
    'header.login': '로그인',
    
    // Welcome Page
    'welcome.badge.loading': '로딩 중...',
    'welcome.badge.looking': '명이 지금 구직 중입니다',
    'welcome.badge.person': '명',
    'welcome.badge.first': '첫 번째 회원이 되세요!',
    'welcome.badge.youare': '당신은 #',
    'welcome.early.title': '얼리 어답터!',
    'welcome.early.message': '첫 10명의 회원 중 한 명입니다! 커뮤니티에 오신 것을 환영합니다! 🚀',
    'welcome.title': '당신은 혼자가 아닙니다',
    'welcome.subtitle': '같은 여정을 하는 사람들이 얼마나 되는지 확인하세요. 연결하고, 경험을 공유하고, 서로를 지원하세요.',
    'welcome.field.select': '분야 선택',
    'welcome.field.technology': '기술',
    'welcome.field.design': '디자인',
    'welcome.field.business': '비즈니스',
    'welcome.field.marketing': '마케팅',
    'welcome.field.education': '교육',
    'welcome.field.healthcare': '의료',
    'welcome.button.join': '커뮤니티 가입',
    
    // Character Creator
    'character.title': '고양이 캐릭터 만들기',
    'character.subtitle': '캐릭터를 커스터마이징하고 커뮤니티에 가입하세요',
    'character.preview': '미리보기',
    'character.preview.placeholder': '고양이를 선택하여 미리보기',
    'character.cat.type': '고양이 종류',
    'character.outfit': '의상',
    'character.notselected': '선택 안 됨',
    'character.complete': '캐릭터 완성!',
    'character.button.back': '← 뒤로',
    'character.button.join': '가입 →',
    
    // Cat Types
    'cat.tabby': '얼룩 고양이',
    'cat.tuxedo': '턱시도 고양이',
    'cat.calico': '삼색 고양이',
    'cat.siamese': '샴 고양이',
    'cat.ginger': '생강 고양이',
    'cat.white': '흰 고양이',
    
    // Outfits
    'outfit.casual': '캐주얼',
    'outfit.casual.desc': '편안하고 여유로운',
    'outfit.business': '비즈니스',
    'outfit.business.desc': '전문적인 룩',
    'outfit.creative': '크리에이티브',
    'outfit.creative.desc': '예술적이고 독특한',
    'outfit.sporty': '스포티',
    'outfit.sporty.desc': '활동적이고 활기찬',
    'outfit.formal': '포멀',
    'outfit.formal.desc': '우아한 스타일',
    'outfit.tech': '테크',
    'outfit.tech.desc': '현대적이고 기술적인',
  },
  'zh-CN': {
    // Header
    'header.title': 'JobboCat',
    'header.features': '特点',
    'header.about': '关于',
    'header.login': '登录',
    
    // Welcome Page
    'welcome.badge.loading': '加载中...',
    'welcome.badge.looking': '人正在找工作',
    'welcome.badge.person': '人',
    'welcome.badge.first': '成为第一个加入的人！',
    'welcome.badge.youare': '你是第 #',
    'welcome.early.title': '早期采用者！',
    'welcome.early.message': '你是前10名成员之一！欢迎来到社区！🚀',
    'welcome.title': '你并不孤单',
    'welcome.subtitle': '看看有多少人在同样的旅程中。连接、分享经验并相互支持。',
    'welcome.field.select': '选择你的领域',
    'welcome.field.technology': '技术',
    'welcome.field.design': '设计',
    'welcome.field.business': '商业',
    'welcome.field.marketing': '营销',
    'welcome.field.education': '教育',
    'welcome.field.healthcare': '医疗保健',
    'welcome.button.join': '加入社区',
    
    // Character Creator
    'character.title': '创建你的猫咪角色',
    'character.subtitle': '自定义你的角色并加入社区',
    'character.preview': '角色预览',
    'character.preview.placeholder': '选择一只猫来预览',
    'character.cat.type': '猫咪类型',
    'character.outfit': '服装',
    'character.notselected': '未选择',
    'character.complete': '角色完成！',
    'character.button.back': '← 返回',
    'character.button.join': '加入社区 →',
    
    // Cat Types
    'cat.tabby': '虎斑猫',
    'cat.tuxedo': '燕尾服猫',
    'cat.calico': '三花猫',
    'cat.siamese': '暹罗猫',
    'cat.ginger': '橘猫',
    'cat.white': '白猫',
    
    // Outfits
    'outfit.casual': '休闲',
    'outfit.casual.desc': '舒适放松',
    'outfit.business': '商务',
    'outfit.business.desc': '专业外观',
    'outfit.creative': '创意',
    'outfit.creative.desc': '艺术独特',
    'outfit.sporty': '运动',
    'outfit.sporty.desc': '活跃有活力',
    'outfit.formal': '正式',
    'outfit.formal.desc': '优雅风格',
    'outfit.tech': '科技',
    'outfit.tech.desc': '现代科技',
  },
  'zh-TW': {
    // Header
    'header.title': 'JobboCat',
    'header.features': '特點',
    'header.about': '關於',
    'header.login': '登入',
    
    // Welcome Page
    'welcome.badge.loading': '載入中...',
    'welcome.badge.looking': '人正在找工作',
    'welcome.badge.person': '人',
    'welcome.badge.first': '成為第一個加入的人！',
    'welcome.badge.youare': '你是第 #',
    'welcome.early.title': '早期採用者！',
    'welcome.early.message': '你是前10名成員之一！歡迎來到社群！🚀',
    'welcome.title': '你並不孤單',
    'welcome.subtitle': '看看有多少人在同樣的旅程中。連接、分享經驗並相互支持。',
    'welcome.field.select': '選擇你的領域',
    'welcome.field.technology': '技術',
    'welcome.field.design': '設計',
    'welcome.field.business': '商業',
    'welcome.field.marketing': '行銷',
    'welcome.field.education': '教育',
    'welcome.field.healthcare': '醫療保健',
    'welcome.button.join': '加入社群',
    
    // Character Creator
    'character.title': '創建你的貓咪角色',
    'character.subtitle': '自訂你的角色並加入社群',
    'character.preview': '角色預覽',
    'character.preview.placeholder': '選擇一隻貓來預覽',
    'character.cat.type': '貓咪類型',
    'character.outfit': '服裝',
    'character.notselected': '未選擇',
    'character.complete': '角色完成！',
    'character.button.back': '← 返回',
    'character.button.join': '加入社群 →',
    
    // Cat Types
    'cat.tabby': '虎斑貓',
    'cat.tuxedo': '燕尾服貓',
    'cat.calico': '三花貓',
    'cat.siamese': '暹羅貓',
    'cat.ginger': '橘貓',
    'cat.white': '白貓',
    
    // Outfits
    'outfit.casual': '休閒',
    'outfit.casual.desc': '舒適放鬆',
    'outfit.business': '商務',
    'outfit.business.desc': '專業外觀',
    'outfit.creative': '創意',
    'outfit.creative.desc': '藝術獨特',
    'outfit.sporty': '運動',
    'outfit.sporty.desc': '活躍有活力',
    'outfit.formal': '正式',
    'outfit.formal.desc': '優雅風格',
    'outfit.tech': '科技',
    'outfit.tech.desc': '現代科技',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
