import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useUser } from '@/context/UserContext';
import { format } from 'date-fns';
import MoodIcon from '@/components/mood-icon';

export default function HomeScreen() {
  const { name, todayMood, entries, theme } = useUser();

  const greetingTime = new Date().getHours() < 12 ? 'Good morning' : new Date().getHours() < 18 ? 'Good afternoon' : 'Good evening';
  const currentDate = format(new Date(), 'EEEE, MMMM do');
  const streak = Math.min(entries.length, 5); // simplified streak logic

  const getMoodLabel = (moodId: string | null) => {
    switch (moodId) {
      case 'happy': return 'Happy';
      case 'good': return 'Good';
      case 'calm': return 'Calm';
      case 'emotional': return 'Emotional';
      case 'loved': return 'Loved';
      case 'sad': return 'Sad';
      case 'crying': return 'Crying';
      default: return 'Feeling okay';
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.date, { color: theme.textSecondary }]}>{currentDate}</Text>
        <Text style={[styles.greeting, { color: theme.text }]}>{greetingTime}, {name} 🌙</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.card, { backgroundColor: theme.backgroundElement, flex: 1, marginRight: 10 }]}>
            <Text style={[styles.cardTitle, { color: theme.textSecondary }]}>Today's mood</Text>
            <View style={styles.moodContent}>
              <MoodIcon mood={todayMood} size={40} />
              <Text style={[styles.moodText, { color: theme.primary, marginTop: 5 }]}>{getMoodLabel(todayMood)}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.card, { backgroundColor: theme.backgroundElement, flex: 1, marginLeft: 10 }]}>
            <Text style={[styles.cardTitle, { color: theme.textSecondary }]}>Journal streak</Text>
            <View style={styles.moodContent}>
              <Text style={styles.streakIcon}>🌱</Text>
              <Text style={[styles.streakText, { color: theme.success }]}>{streak} days blooming</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.quoteCard, { backgroundColor: theme.primary }]}>
          <Text style={styles.quoteTitle}>Daily Quote</Text>
          <Text style={styles.quoteText}>"Small moments become beautiful memories."</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Entries</Text>
          {entries.length === 0 ? (
            <View style={[styles.emptyState, { backgroundColor: theme.backgroundElement }]}>
              <Text style={[styles.emptyStateText, { color: theme.textSecondary }]}>
                No entries yet. Write your first thought! 🌸
              </Text>
            </View>
          ) : (
            entries.slice(0, 3).map((entry, index) => (
              <View key={entry.id || index} style={[styles.entryCard, { backgroundColor: theme.backgroundElement }]}>
                <Text style={[styles.entryDate, { color: theme.textSecondary }]}>{entry.date}</Text>
                <Text style={[styles.entryContent, { color: theme.text }]} numberOfLines={2}>
                  {entry.content}
                </Text>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 30,
    paddingTop: 60,
  },
  date: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 5,
  },
  greeting: {
    fontFamily: 'DancingScript_700Bold',
    fontSize: 32,
  },
  content: {
    padding: 20,
    paddingTop: 0,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  card: {
    padding: 20,
    borderRadius: 24,
  },
  cardTitle: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  moodContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  moodIcon: {
    fontSize: 40,
    marginBottom: 5,
  },
  moodText: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 16,
  },
  streakIcon: {
    fontSize: 36,
    marginBottom: 5,
  },
  streakText: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 16,
  },
  quoteCard: {
    padding: 25,
    borderRadius: 24,
    marginBottom: 30,
  },
  quoteTitle: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#fff',
    opacity: 0.8,
    marginBottom: 10,
  },
  quoteText: {
    fontFamily: 'DancingScript_700Bold',
    fontSize: 24,
    color: '#fff',
    lineHeight: 32,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 20,
    marginBottom: 15,
  },
  emptyState: {
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 16,
  },
  entryCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 10,
  },
  entryDate: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 12,
    marginBottom: 8,
  },
  entryContent: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 15,
    lineHeight: 22,
  },
});
