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
import { Themes } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

import WelcomeFlower from '../../assets/images/onboarding/welcome_flower.svg';
import Sparkles from '../../assets/images/onboarding/sparkles.svg';

const FloatingElement = ({ children, delay, duration, style }: { children: React.ReactNode, delay: number, duration: number, style?: any }) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-12, { duration, easing: Easing.inOut(Easing.ease) }),
          withTiming(12, { duration, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>;
};

export default function WelcomeScreen() {
  const router = useRouter();
  const theme = Themes.floral; // Always use cozy soft pink/white theme for welcoming onboarding

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Background aesthetic elements */}
      <View style={styles.backgroundContainer}>
        {/* Soft pink floating flowers */}
        <FloatingElement delay={0} duration={3200} style={{ position: 'absolute', top: 90, left: 50 }}>
          <WelcomeFlower width={50} height={50} fill="#FFA6A6" />
        </FloatingElement>
        
        <FloatingElement delay={800} duration={3800} style={{ position: 'absolute', top: 220, right: 40 }}>
          <WelcomeFlower width={45} height={45} fill="#FFB7B2" />
        </FloatingElement>

        <FloatingElement delay={1600} duration={4200} style={{ position: 'absolute', bottom: 220, left: 45 }}>
          <WelcomeFlower width={40} height={40} fill="#FFC0CB" />
        </FloatingElement>

        <FloatingElement delay={1200} duration={3500} style={{ position: 'absolute', bottom: 140, right: 60 }}>
          <WelcomeFlower width={35} height={35} fill="#FFA6A6" />
        </FloatingElement>

        <FloatingElement delay={400} duration={4000} style={{ position: 'absolute', top: 380, right: 100 }}>
          <WelcomeFlower width={30} height={30} fill="#FFB7B2" />
        </FloatingElement>
        
        {/* White glowing sparkles */}
        <FloatingElement delay={1000} duration={4000} style={{ position: 'absolute', top: 120, right: 80 }}>
          <Sparkles width={18} height={18} />
        </FloatingElement>

        <FloatingElement delay={500} duration={3400} style={{ position: 'absolute', top: 270, left: 90 }}>
          <Sparkles width={14} height={14} />
        </FloatingElement>

        <FloatingElement delay={1800} duration={4500} style={{ position: 'absolute', bottom: 290, right: 110 }}>
          <Sparkles width={16} height={16} />
        </FloatingElement>

        <FloatingElement delay={1300} duration={3700} style={{ position: 'absolute', bottom: 100, left: 120 }}>
          <Sparkles width={15} height={15} />
        </FloatingElement>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>Hi there, little dreamer</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Welcome to your tiny corner of the world.{'\n'}
          A place where your thoughts, feelings, and memories can bloom.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => router.push('/onboarding/name')}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={styles.buttonText}>Start my journey</Text>
          <Ionicons name="sparkles" size={18} color="#fff" />
        </View>
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
    ...(StyleSheet.absoluteFill as object),
    opacity: 0.8,
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
