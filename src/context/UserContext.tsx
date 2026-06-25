import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Mood = 'happy' | 'good' | 'calm' | 'emotional' | 'tired' | 'sad' | 'excited';
export type Vibe = 'floral' | 'cafe' | 'moonlight' | 'fairy' | 'pastel' | 'cottagecore';

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood?: Mood;
  tags?: string[];
  photos?: string[];
  stickers?: string[];
}

interface UserState {
  isOnboardingComplete: boolean;
  name: string;
  age: string;
  vibe: Vibe | null;
  entries: JournalEntry[];
  todayMood: Mood | null;
}

interface UserContextType extends UserState {
  completeOnboarding: (data: { name: string; age: string; vibe: Vibe }) => Promise<void>;
  addEntry: (entry: JournalEntry) => Promise<void>;
  setTodayMood: (mood: Mood) => Promise<void>;
  resetApp: () => Promise<void>;
}

const defaultState: UserState = {
  isOnboardingComplete: false,
  name: '',
  age: '',
  vibe: null,
  entries: [],
  todayMood: null,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = '@bloom_user_data';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<UserState>(defaultState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedData) {
        setState(JSON.parse(storedData));
      }
    } catch (e) {
      console.error('Failed to load user data', e);
    } finally {
      setIsLoaded(true);
    }
  };

  const saveData = async (newState: UserState) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      console.error('Failed to save user data', e);
    }
  };

  const completeOnboarding = async (data: { name: string; age: string; vibe: Vibe }) => {
    const newState = {
      ...state,
      ...data,
      isOnboardingComplete: true,
    };
    setState(newState);
    await saveData(newState);
  };

  const addEntry = async (entry: JournalEntry) => {
    const newState = {
      ...state,
      entries: [entry, ...state.entries],
    };
    setState(newState);
    await saveData(newState);
  };

  const setTodayMood = async (mood: Mood) => {
    const newState = {
      ...state,
      todayMood: mood,
    };
    setState(newState);
    await saveData(newState);
  };

  const resetApp = async () => {
    setState(defaultState);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  if (!isLoaded) {
    return null; // Or a splash screen
  }

  return (
    <UserContext.Provider value={{ ...state, completeOnboarding, addEntry, setTodayMood, resetApp }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
