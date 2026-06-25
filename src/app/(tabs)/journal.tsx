import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { useUser } from '@/context/UserContext';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function JournalScreen() {
  const { entries } = useUser();
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>My Journal 📖</Text>
      </View>

      <FlatList
        data={entries}
        keyExtractor={(item, index) => item.id || index.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={[styles.emptyState, { backgroundColor: theme.backgroundElement }]}>
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              Your pages are empty. {'\n'}Start writing your story 🌸
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardDate, { color: theme.textSecondary }]}>{item.date}</Text>
              {item.mood && (
                <Text style={styles.cardMood}>
                  {item.mood === 'happy' ? '🥰' : 
                   item.mood === 'sad' ? '🌧' : 
                   item.mood === 'calm' ? '😌' : '✨'}
                </Text>
              )}
            </View>
            <Text style={[styles.cardContent, { color: theme.text }]}>{item.content}</Text>
            {item.tags && item.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {item.tags.map((tag, idx) => (
                  <View key={idx} style={[styles.tag, { backgroundColor: theme.accent2 }]}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.primary }]}
        onPress={() => router.push('/new-entry')}
      >
        <Ionicons name="pencil" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 10,
  },
  title: {
    fontFamily: 'DancingScript_700Bold',
    fontSize: 36,
  },
  list: {
    padding: 20,
    paddingBottom: 100,
  },
  emptyState: {
    padding: 40,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  card: {
    padding: 20,
    borderRadius: 24,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardDate: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 14,
  },
  cardMood: {
    fontSize: 20,
  },
  cardContent: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 16,
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagText: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 12,
    color: '#fff',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFA6A6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
});
