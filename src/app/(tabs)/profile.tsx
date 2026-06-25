import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { useUser } from '@/context/UserContext';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { name, age, vibe, resetApp } = useUser();
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const router = useRouter();

  const handleReset = async () => {
    await resetApp();
    router.replace('/onboarding');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>My World 🎀</Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.profileCard, { backgroundColor: theme.backgroundElement }]}>
          <View style={[styles.avatar, { backgroundColor: theme.accent2 }]}>
            <Text style={styles.avatarText}>{name ? name[0].toUpperCase() : '?'}</Text>
          </View>
          <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
          <Text style={[styles.details, { color: theme.textSecondary }]}>
            {age} years old • {vibe === 'floral' ? 'Soft & Floral 🌷' : vibe === 'cafe' ? 'Cozy Cafe ☕' : vibe === 'moonlight' ? 'Moonlight Dreams 🌙' : vibe === 'fairy' ? 'Fairy Garden 🦋' : vibe === 'pastel' ? 'Cute Pastel 🎀' : 'Cottagecore 🌿'}
          </Text>
        </View>

        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Settings</Text>
          
          <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.backgroundElement }]}>
            <View style={styles.settingLeft}>
              <Ionicons name="color-palette" size={24} color={theme.primary} />
              <Text style={[styles.settingText, { color: theme.text }]}>Change Theme</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.backgroundElement }]}>
            <View style={styles.settingLeft}>
              <Ionicons name="lock-closed" size={24} color={theme.primary} />
              <Text style={[styles.settingText, { color: theme.text }]}>Journal Lock</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, { backgroundColor: theme.backgroundElement }]}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={24} color={theme.primary} />
              <Text style={[styles.settingText, { color: theme.text }]}>Reminders</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.resetButton, { borderColor: theme.textSecondary }]} onPress={handleReset}>
          <Text style={[styles.resetText, { color: theme.textSecondary }]}>Reset App (For Testing)</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontFamily: 'DancingScript_700Bold',
    fontSize: 36,
  },
  content: {
    padding: 20,
  },
  profileCard: {
    padding: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontFamily: 'DancingScript_700Bold',
    fontSize: 40,
    color: '#fff',
  },
  name: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 24,
    marginBottom: 5,
  },
  details: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 16,
  },
  settingsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 14,
    textTransform: 'uppercase',
    marginBottom: 15,
    marginLeft: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 16,
    marginLeft: 15,
  },
  resetButton: {
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  resetText: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 16,
  },
});
