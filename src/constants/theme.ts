import '@/global.css';
import { Platform } from 'react-native';

export type VibeType = 'floral' | 'cafe' | 'moonlight' | 'fairy' | 'pastel' | 'cottagecore';

export interface ThemeColors {
  text: string;
  background: string;
  backgroundElement: string;
  backgroundSelected: string;
  textSecondary: string;
  primary: string;
  accent: string;
  accent2?: string;
  success: string;
  cardHighlight?: string;
}

export const Themes: Record<VibeType, ThemeColors> = {
  floral: {
    text: '#5B4B49',
    background: '#FFF5F5',
    backgroundElement: '#FFE3E3',
    backgroundSelected: '#FFD1D1',
    textSecondary: '#A28C8C',
    primary: '#FFA6A6',
    accent: '#BDE0FE',
    accent2: '#CDB4DB',
    success: '#D8F3DC',
    cardHighlight: '#FFF0F2',
  },
  cafe: {
    text: '#4A3C31',
    background: '#FAF6F0',
    backgroundElement: '#F0E3D3',
    backgroundSelected: '#E5D1B8',
    textSecondary: '#8B7B6B',
    primary: '#8C6239',
    accent: '#D4B895',
    accent2: '#C7A27C',
    success: '#E2E8F0',
    cardHighlight: '#FAF0E6',
  },
  moonlight: {
    text: '#E0AAFF',
    background: '#10002B',
    backgroundElement: '#3C096C',
    backgroundSelected: '#5A189A',
    textSecondary: '#9D4EDD',
    primary: '#7B2CBF',
    accent: '#FFD700',
    accent2: '#240046',
    success: '#34D399',
    cardHighlight: '#1A0040',
  },
  fairy: {
    text: '#2E5A44',
    background: '#F4F9F4',
    backgroundElement: '#D8F3DC',
    backgroundSelected: '#B7E4C7',
    textSecondary: '#74A58E',
    primary: '#CDB4DB',
    accent: '#FFD166',
    accent2: '#A8DADC',
    success: '#457B9D',
    cardHighlight: '#EAF4EC',
  },
  pastel: {
    text: '#4D495B',
    background: '#FFFFFC',
    backgroundElement: '#FDFFB6',
    backgroundSelected: '#FFD6A5',
    textSecondary: '#908A9F',
    primary: '#FFC6FF',
    accent: '#9BF6FF',
    accent2: '#BFFCC6',
    success: '#CAFFBF',
    cardHighlight: '#FFF0F5',
  },
  cottagecore: {
    text: '#4E3B31',
    background: '#E6E8D2',
    backgroundElement: '#D2D4C0',
    backgroundSelected: '#B8BAA2',
    textSecondary: '#7C7F62',
    primary: '#B58263',
    accent: '#A3B19B',
    accent2: '#D4A373',
    success: '#A3B19B',
    cardHighlight: '#F4F1EA',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

export const Colors = {
  light: Themes.floral,
  dark: Themes.moonlight,
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

