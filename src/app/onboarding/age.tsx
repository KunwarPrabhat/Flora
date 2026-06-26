import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AgeScreen() {
  const [age, setAge] = useState('');
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];

  const handleNext = async () => {
    if (age.trim()) {
      await AsyncStorage.setItem('@temp_age', age.trim());
      router.push('/onboarding/vibe');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>One more tiny thing</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          How many candles are on your birthday cake?
        </Text>

        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundElement, borderColor: theme.accent2 }]}
          placeholder="e.g. 21"
          placeholderTextColor={theme.textSecondary}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          maxLength={3}
          autoFocus
        />

        {age.trim().length > 0 && (
          <Text style={[styles.greeting, { color: theme.primary }]}>
            Perfect{'\n'}I'll make this little journal feel just right for you.
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.button, 
          { backgroundColor: age.trim() ? theme.primary : theme.backgroundElement }
        ]}
        onPress={handleNext}
        disabled={!age.trim()}
      >
        <Text style={[styles.buttonText, { color: age.trim() ? '#fff' : theme.textSecondary }]}>
          Next
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 26,
  },
  input: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 24,
    width: 120,
    padding: 20,
    borderRadius: 20,
    borderWidth: 2,
    textAlign: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    marginTop: 20,
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
