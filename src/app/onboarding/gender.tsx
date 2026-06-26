import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MaleIcon from '../../assets/images/tabs/tab_profile_men.svg';
import FemaleIcon from '../../assets/images/tabs/tab_profile_women.svg';

export default function GenderScreen() {
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];

  const handleNext = async () => {
    if (gender) {
      await AsyncStorage.setItem('@temp_gender', gender);
      router.push('/onboarding/age');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Choose your avatar</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Select the option that represents you best.
        </Text>

        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.avatarCard,
              {
                backgroundColor: theme.backgroundElement,
                borderColor: gender === 'female' ? theme.primary : 'transparent',
                borderWidth: 3,
              },
            ]}
            onPress={() => setGender('female')}
          >
            <View style={styles.avatarCircle}>
              <FemaleIcon width={80} height={80} />
            </View>
            <Text style={[styles.genderLabel, { color: theme.text }]}>Female</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.avatarCard,
              {
                backgroundColor: theme.backgroundElement,
                borderColor: gender === 'male' ? theme.primary : 'transparent',
                borderWidth: 3,
              },
            ]}
            onPress={() => setGender('male')}
          >
            <View style={styles.avatarCircle}>
              <MaleIcon width={80} height={80} />
            </View>
            <Text style={[styles.genderLabel, { color: theme.text }]}>Male</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: gender ? theme.primary : theme.backgroundElement },
        ]}
        onPress={handleNext}
        disabled={!gender}
      >
        <Text style={[styles.buttonText, { color: gender ? '#fff' : theme.textSecondary }]}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  avatarCard: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 24,
    width: 140,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 12,
  },
  genderLabel: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 18,
  },
});
