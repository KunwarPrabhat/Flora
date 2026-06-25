import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser, Vibe, Mood } from '@/context/UserContext';

const vibes: { id: Vibe; label: string; icon: string }[] = [
  { id: 'floral', label: 'Soft & Floral', icon: '🌷' },
  { id: 'cafe', label: 'Cozy Cafe', icon: '☕' },
  { id: 'moonlight', label: 'Moonlight Dreams', icon: '🌙' },
  { id: 'fairy', label: 'Fairy Garden', icon: '🦋' },
  { id: 'pastel', label: 'Cute Pastel', icon: '🎀' },
  { id: 'cottagecore', label: 'Cottagecore', icon: '🌿' },
];

const moods: { id: Mood; label: string; icon: string }[] = [
  { id: 'happy', label: 'Happy', icon: '🥰' },
  { id: 'good', label: 'Good', icon: '😊' },
  { id: 'calm', label: 'Calm', icon: '😌' },
  { id: 'emotional', label: 'Emotional', icon: '🥺' },
  { id: 'tired', label: 'Tired', icon: '😴' },
  { id: 'sad', label: 'Sad', icon: '🌧' },
  { id: 'excited', label: 'Excited', icon: '✨' },
];

export default function VibeScreen() {
  const [selectedVibe, setSelectedVibe] = useState<Vibe | null>(null);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const { completeOnboarding, setTodayMood } = useUser();

  const handleFinish = async () => {
    if (selectedVibe && selectedMood) {
      const name = await AsyncStorage.getItem('@temp_name') || 'Dreamer';
      const age = await AsyncStorage.getItem('@temp_age') || '18';
      
      await setTodayMood(selectedMood);
      await completeOnboarding({ name, age, vibe: selectedVibe });
      
      // The _layout will automatically redirect to /(tabs) when isOnboardingComplete is true
      router.replace('/(tabs)');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text, marginTop: 40 }]}>What kind of little world do you want? 🌸</Text>
        
        <View style={styles.grid}>
          {vibes.map((vibe) => (
            <TouchableOpacity
              key={vibe.id}
              style={[
                styles.card,
                { 
                  backgroundColor: selectedVibe === vibe.id ? theme.primary : theme.backgroundElement,
                  borderColor: selectedVibe === vibe.id ? theme.primary : 'transparent',
                }
              ]}
              onPress={() => setSelectedVibe(vibe.id)}
            >
              <Text style={styles.cardIcon}>{vibe.icon}</Text>
              <Text style={[styles.cardLabel, { color: selectedVibe === vibe.id ? '#fff' : theme.textSecondary }]}>
                {vibe.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.title, { color: theme.text, marginTop: 40 }]}>How are you feeling today?</Text>
        
        <View style={styles.grid}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[
                styles.moodCard,
                { 
                  backgroundColor: selectedMood === mood.id ? theme.accent : theme.backgroundElement,
                }
              ]}
              onPress={() => setSelectedMood(mood.id)}
            >
              <Text style={styles.cardIcon}>{mood.icon}</Text>
              <Text style={[styles.cardLabel, { color: selectedMood === mood.id ? '#fff' : theme.textSecondary }]}>
                {mood.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedVibe && selectedMood && (
          <View style={styles.readyContainer}>
            <Text style={[styles.readyText, { color: theme.primary }]}>
              Your journal is ready 💕{'\n'}Let's fill these pages with your little moments.
            </Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.primary }]}
              onPress={handleFinish}
            >
              <Text style={styles.buttonText}>Enter my journal 🌸</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ height: 100 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'DancingScript_700Bold',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
  },
  card: {
    width: '45%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
  },
  moodCard: {
    width: '28%',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  cardLabel: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 14,
    textAlign: 'center',
  },
  readyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  readyText: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#FFA6A6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    fontFamily: 'Quicksand_700Bold',
    color: '#fff',
    fontSize: 18,
  },
});
