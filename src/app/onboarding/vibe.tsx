import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser, Vibe } from '@/context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Themes } from '@/constants/theme';

const vibes: { id: Vibe; label: string; icon: string }[] = [
  { id: 'floral', label: 'Soft & Floral', icon: '🌷' },
  { id: 'cafe', label: 'Cozy Cafe', icon: '☕' },
  { id: 'moonlight', label: 'Moonlight Dreams', icon: '🌙' },
  { id: 'fairy', label: 'Fairy Garden', icon: '🦋' },
  { id: 'pastel', label: 'Cute Pastel', icon: '🎀' },
  { id: 'cottagecore', label: 'Cottagecore', icon: '🌿' },
];

export default function VibeScreen() {
  const [selectedVibe, setSelectedVibe] = useState<Vibe | null>(null);
  const router = useRouter();
  const { completeOnboarding, theme: defaultTheme } = useUser();

  // If vibe is selected, use its theme colors; otherwise, use default theme colors
  const activeTheme = selectedVibe ? Themes[selectedVibe] : defaultTheme;

  const handleFinish = async () => {
    if (selectedVibe) {
      const name = await AsyncStorage.getItem('@temp_name') || 'Dreamer';
      const age = await AsyncStorage.getItem('@temp_age') || '18';
      
      await completeOnboarding({ name, age, vibe: selectedVibe });
      router.replace('/(tabs)');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: activeTheme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: activeTheme.text, marginTop: 60 }]}>
          What kind of little world do you want? 🌸
        </Text>
        
        <View style={styles.grid}>
          {vibes.map((vibe) => (
            <TouchableOpacity
              key={vibe.id}
              style={[
                styles.card,
                { 
                  backgroundColor: selectedVibe === vibe.id ? activeTheme.primary : activeTheme.backgroundElement,
                  borderColor: selectedVibe === vibe.id ? activeTheme.primary : 'transparent',
                }
              ]}
              onPress={() => setSelectedVibe(vibe.id)}
            >
              <Text style={styles.cardIcon}>{vibe.icon}</Text>
              <Text style={[styles.cardLabel, { color: selectedVibe === vibe.id ? '#fff' : activeTheme.textSecondary }]}>
                {vibe.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedVibe && (
          <View style={styles.readyContainer}>
            <Text style={[styles.readyText, { color: activeTheme.primary }]}>
              Your journal is ready 💕{'\n'}Let's fill these pages with your little moments.
            </Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: activeTheme.primary }]}
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
    marginBottom: 30,
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
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 2,
  },
  cardIcon: {
    fontSize: 36,
    marginBottom: 10,
  },
  cardLabel: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 14,
    textAlign: 'center',
  },
  readyContainer: {
    marginTop: 50,
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
