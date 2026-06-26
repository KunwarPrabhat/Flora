import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser, Vibe } from '@/context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Themes } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

const vibeImages = {
  floral: require('../../assets/images/worlds/soft.jpg'),
  cafe: require('../../assets/images/worlds/cozy.jpg'),
  moonlight: require('../../assets/images/worlds/moonlight.jpg'),
  fairy: require('../../assets/images/worlds/garden.jpg'),
  pastel: require('../../assets/images/worlds/pastel.jpg'),
  cottagecore: require('../../assets/images/worlds/cottage.jpg'),
};

const vibes: { id: Vibe; label: string }[] = [
  { id: 'floral', label: 'Soft & Floral' },
  { id: 'cafe', label: 'Cozy Cafe' },
  { id: 'moonlight', label: 'Moonlight Dreams' },
  { id: 'fairy', label: 'Fairy Garden' },
  { id: 'pastel', label: 'Cute Pastel' },
  { id: 'cottagecore', label: 'Cottagecore' },
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
      const gender = (await AsyncStorage.getItem('@temp_gender') || 'female') as any;
      
      await completeOnboarding({ name, age, vibe: selectedVibe, gender });
      router.replace('/(tabs)');
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: activeTheme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: activeTheme.text, marginTop: 60 }]}>
          What kind of little world do you want?
        </Text>
        
        <View style={styles.grid}>
          {vibes.map((vibe) => (
            <TouchableOpacity
              key={vibe.id}
              style={[
                styles.card,
                { 
                  borderColor: selectedVibe === vibe.id ? activeTheme.primary : 'transparent',
                  borderWidth: selectedVibe === vibe.id ? 3 : 0,
                }
              ]}
              onPress={() => setSelectedVibe(vibe.id)}
            >
              <ImageBackground
                source={vibeImages[vibe.id]}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
              />
              <View style={[
                styles.cardOverlay,
                { backgroundColor: selectedVibe === vibe.id ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.45)' }
              ]} />
              <Text style={styles.cardLabel}>
                {vibe.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedVibe && (
          <View style={styles.readyContainer}>
            <Text style={[styles.readyText, { color: activeTheme.primary }]}>
              Your journal is ready{'\n'}Let's fill these pages with your little moments.
            </Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: activeTheme.primary }]}
              onPress={handleFinish}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={styles.buttonText}>Enter my journal</Text>
                <Ionicons name="enter-outline" size={20} color="#fff" />
              </View>
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
    fontFamily: 'Quicksand_700Bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    width: '100%',
  },
  card: {
    width: '45%',
    height: 120,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
  cardLabel: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    zIndex: 2,
    paddingHorizontal: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
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
