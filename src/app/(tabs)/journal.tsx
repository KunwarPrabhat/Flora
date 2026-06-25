import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useUser } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import MoodIcon from '@/components/mood-icon';

export default function JournalScreen() {
  const { entries, theme } = useUser();
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
          <View style={[
            styles.card, 
            { 
              backgroundColor: item.backgroundColor || theme.backgroundElement,
              borderColor: theme.backgroundSelected,
              borderWidth: 1 
            }
          ]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardDate, { color: theme.textSecondary }]}>{item.date}</Text>
              {item.mood && (
                <MoodIcon mood={item.mood} size={28} />
              )}
            </View>
            
            {/* Display Photos if any */}
            {item.photos && item.photos.length > 0 && (
              <View style={styles.photoGrid}>
                {item.photos.map((photoUri, index) => (
                  <Image key={index} source={{ uri: photoUri }} style={styles.photo} />
                ))}
              </View>
            )}

            <Text style={[
              styles.cardContent, 
              { 
                color: theme.text,
                fontFamily: item.fontFamily === 'System' ? undefined : item.fontFamily || 'Quicksand_500Medium'
              }
            ]}>
              {item.content}
            </Text>

            {item.tags && item.tags.length > 0 && (
              <View style={styles.tagsContainer}>
                {item.tags.map((tag, idx) => (
                  <View key={idx} style={[styles.tag, { backgroundColor: theme.primary }]}>
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
    fontSize: 16,
    lineHeight: 24,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  photo: {
    width: '100%',
    height: 150,
    borderRadius: 16,
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
