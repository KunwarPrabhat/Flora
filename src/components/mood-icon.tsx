import React from 'react';
import { View } from 'react-native';
import { Mood } from '@/context/UserContext';

import MoodHappy1 from '../assets/images/moods/mood_happy1.svg';
import MoodGood from '../assets/images/moods/mood_good.svg';
import MoodCalm from '../assets/images/moods/mood_calm.svg';
import MoodEmotional from '../assets/images/moods/mood_emotional.svg';
import Loved from '../assets/images/moods/loved.svg';
import MoodSad from '../assets/images/moods/mood_sad.svg';
import MoodCrying from '../assets/images/moods/mood_crying.svg';

interface MoodIconProps {
  mood: Mood | null | undefined;
  size?: number;
}

export const moodIcons: Record<Mood, React.FC<any>> = {
  happy: MoodHappy1,
  good: MoodGood,
  calm: MoodCalm,
  emotional: MoodEmotional,
  loved: Loved,
  sad: MoodSad,
  crying: MoodCrying,
};

export default function MoodIcon({ mood, size = 32 }: MoodIconProps) {
  if (!mood || !moodIcons[mood]) {
    // Default fallback placeholder (could be a simple circle or custom svg if wanted)
    return <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: '#E2E8F0' }} />;
  }

  const IconComponent = moodIcons[mood];
  return <IconComponent width={size} height={size} />;
}
