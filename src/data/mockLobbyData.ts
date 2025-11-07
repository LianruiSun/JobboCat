import assetsData from '../assets/character-assets.json';
import type { OtherUser } from '../components/lobby/OthersFocusingList';
import type { Message } from '../components/lobby/PublicMessageStream';

export const MOCK_STATS = {
  totalJobSeekers: 1247,
  sameFieldCount: 89,
  focusingCount: 34,
  dailyGoal: 6,
} as const;

export const MOCK_OTHERS_FOCUSING: OtherUser[] = [
  {
    id: 101,
    username: '实习生猫',
    focusMinutes: 12,
    character: {
      cat: assetsData.cats[0]?.path || '',
      table: assetsData.tables[0]?.path || '',
      hat: assetsData.hats[1]?.path || '',
    },
    description: 'Keep going! You\'re getting closer to your next reward~',
  },
  {
    id: 102,
    username: '后端喵',
    focusMinutes: 7,
    character: {
      cat: assetsData.cats[0]?.path || '',
      table: assetsData.tables[0]?.path || '',
    },
    description: 'Working on database optimization 💪',
  },
  {
    id: 103,
    username: '算法猫',
    focusMinutes: 19,
    character: {
      cat: assetsData.cats[0]?.path || '',
      table: assetsData.tables[0]?.path || '',
      other: assetsData.others[1]?.path || '',
    },
    description: 'LeetCode grind never stops 🔥',
  },
  {
    id: 104,
    username: '前端喵',
    focusMinutes: 3,
    character: {
      cat: assetsData.cats[0]?.path || '',
      table: assetsData.tables[0]?.path || '',
      hat: assetsData.hats[1]?.path || '',
    },
    description: 'Building a cool feature today!',
  },
];

export const MOCK_PUBLIC_MESSAGES: Message[] = [
  { id: 1, user: '实习生猫', content: '刚刷完 2 道 LeetCode Medium！', timestamp: '12:05' },
  { id: 2, user: 'Offer猫', content: '今天修改了 5 份简历，加油大家！', timestamp: '12:10' },
  { id: 3, user: '前端喵', content: '正在学 TypeScript，有没有推荐的资源？', timestamp: '12:15' },
  { id: 4, user: '算法猫', content: '打卡第 30 天！坚持就是胜利 💪', timestamp: '12:20' },
];
