import React from 'react';
import { View, Text, StyleSheet, FlatList, useColorScheme } from 'react-native';
import { useUser } from '@/context/UserContext';
import { Colors } from '@/constants/theme';

export default function MemoriesScreen() {
  const { entries } = useUser();
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Timeline ✨</Text>
      </View>

      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.timeline}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: theme.textSecondary }]}>
            No memories to look back on yet.
          </Text>
        }
        renderItem={({ item, index }) => (
          <View style={styles.timelineItem}>
            <View style={styles.timelineLine}>
              <View style={[styles.dot, { backgroundColor: theme.primary }]} />
              {index !== entries.length - 1 && (
                <View style={[styles.line, { backgroundColor: theme.backgroundSelected }]} />
              )}
            </View>
            <View style={[styles.timelineContent, { backgroundColor: theme.backgroundElement }]}>
              <Text style={[styles.date, { color: theme.textSecondary }]}>{item.date}</Text>
              <Text style={[styles.content, { color: theme.text }]} numberOfLines={3}>{item.content}</Text>
            </View>
          </View>
        )}
      />
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
  },
  title: {
    fontFamily: 'DancingScript_700Bold',
    fontSize: 36,
  },
  timeline: {
    padding: 20,
    paddingBottom: 100,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineLine: {
    width: 30,
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 5,
  },
  line: {
    width: 2,
    flex: 1,
    marginTop: 5,
  },
  timelineContent: {
    flex: 1,
    padding: 15,
    borderRadius: 16,
    marginLeft: 10,
  },
  date: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 12,
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  content: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 15,
    lineHeight: 22,
  },
  empty: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
});
