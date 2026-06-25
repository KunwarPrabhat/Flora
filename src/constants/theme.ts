/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#5B4B49', // Soft dark brown/grey
    background: '#FFF5F5', // Very light pastel pink
    backgroundElement: '#FFE3E3', // Deeper pink for elements
    backgroundSelected: '#FFD1D1',
    textSecondary: '#A28C8C',
    primary: '#FFA6A6', // Coral/pink primary
    accent: '#BDE0FE', // Pastel blue
    accent2: '#CDB4DB', // Pastel purple
    success: '#D8F3DC', // Pastel green
  },
  dark: {
    text: '#FFF5F5',
    background: '#2B2121', // Dark warm brown/grey
    backgroundElement: '#403333',
    backgroundSelected: '#544646',
    textSecondary: '#C5B5B5',
    primary: '#FFA6A6',
    accent: '#BDE0FE',
    accent2: '#CDB4DB',
    success: '#D8F3DC',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
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
