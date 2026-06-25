import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, useColorScheme, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser, Mood } from '@/context/UserContext';
import { Colors } from '@/constants/theme';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';

export default function NewEntryScreen() {
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const { addEntry } = useUser();
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];

  const handleSave = async () => {
    if (content.trim()) {
      await addEntry({
        id: Date.now().toString(),
        date: format(new Date(), 'MMM dd, yyyy'),
        content: content.trim(),
        mood: selectedMood || undefined,
        tags: ['diary']
      });
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <Ionicons name="close" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>New Memory ✨</Text>
        <TouchableOpacity onPress={handleSave} style={styles.headerBtn} disabled={!content.trim()}>
          <Text style={[styles.saveText, { color: content.trim() ? theme.primary : theme.textSecondary }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={[styles.date, { color: theme.textSecondary }]}>{format(new Date(), 'EEEE, MMMM do yyyy')}</Text>
        
        <View style={styles.moodSelector}>
          {['happy', 'good', 'calm', 'emotional', 'tired', 'sad', 'excited'].map((m) => (
            <TouchableOpacity 
              key={m} 
              onPress={() => setSelectedMood(m as Mood)}
              style={[
                styles.moodBtn, 
                selectedMood === m && { backgroundColor: theme.accent2, borderColor: theme.accent2 }
              ]}
            >
              <Text style={styles.moodEmoji}>
                {m === 'happy' ? '🥰' : m === 'good' ? '😊' : m === 'calm' ? '😌' : m === 'emotional' ? '🥺' : m === 'tired' ? '😴' : m === 'sad' ? '🌧' : '✨'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={[styles.input, { color: theme.text }]}
          placeholder="Dear Diary 💕..."
          placeholderTextColor={theme.textSecondary}
          multiline
          value={content}
          onChangeText={setContent}
          autoFocus
        />
      </ScrollView>
      
      {/* Toolbar */}
      <View style={[styles.toolbar, { backgroundColor: theme.backgroundElement, borderTopColor: theme.backgroundSelected }]}>
        <TouchableOpacity style={styles.toolBtn}>
          <Ionicons name="image" size={24} color={theme.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolBtn}>
          <Ionicons name="text" size={24} color={theme.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolBtn}>
          <Ionicons name="color-palette" size={24} color={theme.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolBtn}>
          <Ionicons name="pricetag" size={24} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  headerBtn: {
    padding: 5,
  },
  headerTitle: {
    fontFamily: 'DancingScript_700Bold',
    fontSize: 24,
  },
  saveText: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 18,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  date: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 14,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 10,
  },
  moodBtn: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  moodEmoji: {
    fontSize: 24,
  },
  input: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 18,
    lineHeight: 28,
    minHeight: 300,
    textAlignVertical: 'top',
  },
  toolbar: {
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 30,
    borderTopWidth: 1,
    justifyContent: 'space-around',
  },
  toolBtn: {
    padding: 10,
  },
});
