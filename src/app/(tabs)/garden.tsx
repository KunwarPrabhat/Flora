import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useUser } from '@/context/UserContext';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence, Easing } from 'react-native-reanimated';
import { useEffect } from 'react';

const GrowthStage = ({ level, secondaryColor }: { level: number; secondaryColor: string }) => {
  let icon = '🌱'; // Seed
  let label = 'A tiny seed of thought';
  
  if (level >= 50) {
    icon = '🌳';
    label = 'A beautiful blooming tree';
  } else if (level >= 15) {
    icon = '🌷';
    label = 'A lovely flower';
  } else if (level >= 5) {
    icon = '🌿';
    label = 'A growing little plant';
  }

  const scale = useSharedValue(0.8);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.8, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.growthContainer}>
      <Animated.Text style={[styles.growthIcon, animatedStyle]}>{icon}</Animated.Text>
      <Text style={[styles.growthLabel, { color: secondaryColor }]}>{label}</Text>
    </View>
  );
}

export default function GardenScreen() {
  const { entries, name, theme } = useUser();
  const entriesCount = entries.length;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>My Garden 🌱</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Every memory helps your garden grow.
        </Text>
      </View>

      <View style={styles.gardenArea}>
        <View style={styles.sky}>
          <Text style={styles.cloud1}>☁️</Text>
          <Text style={styles.cloud2}>☁️</Text>
        </View>
        
        <GrowthStage level={entriesCount} secondaryColor={theme.textSecondary} />
        
        <View style={[styles.ground, { backgroundColor: theme.success }]} />
      </View>

      <View style={[styles.statsCard, { backgroundColor: theme.backgroundElement }]}>
        <Text style={[styles.statsTitle, { color: theme.text }]}>{name}'s Progress</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: theme.primary }]}>{entriesCount}</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Memories</Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: theme.primary }]}>
              {entriesCount >= 50 ? 'Max' : (entriesCount >= 15 ? 50 - entriesCount : (entriesCount >= 5 ? 15 - entriesCount : 5 - entriesCount))}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>To Next Stage</Text>
          </View>
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
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'DancingScript_700Bold',
    fontSize: 36,
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 16,
  },
  gardenArea: {
    height: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
    marginTop: 20,
  },
  sky: {
    ...(StyleSheet.absoluteFill as object),
  },
  cloud1: {
    position: 'absolute',
    top: 50,
    left: 40,
    fontSize: 40,
    opacity: 0.8,
  },
  cloud2: {
    position: 'absolute',
    top: 100,
    right: 50,
    fontSize: 30,
    opacity: 0.6,
  },
  ground: {
    height: 40,
    width: '100%',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    opacity: 0.5,
  },
  growthContainer: {
    alignItems: 'center',
    marginBottom: -10,
    zIndex: 10,
  },
  growthIcon: {
    fontSize: 120,
  },
  growthLabel: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  statsCard: {
    margin: 20,
    padding: 20,
    borderRadius: 24,
  },
  statsTitle: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'DancingScript_700Bold',
    fontSize: 32,
  },
  statLabel: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 14,
  },
});
