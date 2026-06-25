import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NameScreen() {
  const [name, setName] = useState('');
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];

  const handleNext = async () => {
    if (name.trim()) {
      // Temporarily store name until onboarding is fully complete
      await AsyncStorage.setItem('@temp_name', name.trim());
      router.push('/onboarding/age');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Before we begin...</Text>
        <Text style={[styles.title, { color: theme.text }]}>what should I call you? 💕</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Every beautiful story needs a name.
        </Text>

        <TextInput
          style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundElement, borderColor: theme.accent }]}
          placeholder="Your name..."
          placeholderTextColor={theme.textSecondary}
          value={name}
          onChangeText={setName}
          autoFocus
        />

        {name.trim().length > 0 && (
          <Text style={[styles.greeting, { color: theme.primary }]}>
            Nice to meet you, {name}! 🌷{'\n'}I'm so happy you're here.
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.button, 
          { backgroundColor: name.trim() ? theme.primary : theme.backgroundElement }
        ]}
        onPress={handleNext}
        disabled={!name.trim()}
      >
        <Text style={[styles.buttonText, { color: name.trim() ? '#fff' : theme.textSecondary }]}>
          Next ✨
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
    fontFamily: 'DancingScript_700Bold',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 20,
    width: '100%',
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
