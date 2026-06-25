import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { Colors } from '@/constants/theme';
import { useColorScheme } from 'react-native';

const FloatingElement = ({ children, delay, duration }: { children: React.ReactNode, delay: number, duration: number }) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-10, { duration, easing: Easing.inOut(Easing.ease) }),
          withTiming(10, { duration, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration, easing: Easing.inOut(Easing.ease) })
        ),
        -1, // Infinite repeat
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default function WelcomeScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Background aesthetic elements */}
      <View style={styles.backgroundContainer}>
        <FloatingElement delay={0} duration={3000}>
          <Text style={styles.floatingIcon}>🌸</Text>
        </FloatingElement>
        <FloatingElement delay={1000} duration={4000}>
          <Text style={[styles.floatingIcon, { fontSize: 40, left: 200, top: 100 }]}>✨</Text>
        </FloatingElement>
        <FloatingElement delay={500} duration={3500}>
          <Text style={[styles.floatingIcon, { fontSize: 35, left: 50, top: 250 }]}>☁️</Text>
        </FloatingElement>
        <FloatingElement delay={1500} duration={4500}>
          <Text style={[styles.floatingIcon, { fontSize: 25, left: 250, top: 300 }]}>🌸</Text>
        </FloatingElement>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Hi there, little dreamer 🌸</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Welcome to your tiny corner of the world.{'\n'}
          A place where your thoughts, feelings, and memories can bloom.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => router.push('/onboarding/name')}
      >
        <Text style={styles.buttonText}>Start my journey ✨</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
  },
  floatingIcon: {
    fontSize: 50,
    position: 'absolute',
    top: 50,
    left: 80,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  title: {
    fontFamily: 'DancingScript_700Bold',
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 50,
    shadowColor: '#FFA6A6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontFamily: 'Quicksand_700Bold',
    color: '#fff',
    fontSize: 18,
  },
});
