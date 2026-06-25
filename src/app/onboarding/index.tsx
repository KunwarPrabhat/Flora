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

import WelcomeFlower from '../../assets/images/onboarding/welcome_flower.svg';
import Sparkles from '../../assets/images/onboarding/sparkles.svg';
import CloudPastel from '../../assets/images/onboarding/cloud_pastel.svg';

const FloatingElement = ({ children, delay, duration, style }: { children: React.ReactNode, delay: number, duration: number, style?: any }) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-15, { duration, easing: Easing.inOut(Easing.ease) }),
          withTiming(15, { duration, easing: Easing.inOut(Easing.ease) }),
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
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Background aesthetic elements */}
      <View style={styles.backgroundContainer}>
        <FloatingElement delay={0} duration={3000} style={{ position: 'absolute', top: 80, left: 60 }}>
          <WelcomeFlower width={80} height={80} />
        </FloatingElement>
        
        <FloatingElement delay={1000} duration={4000} style={{ position: 'absolute', top: 120, right: 60 }}>
          <Sparkles width={60} height={60} />
        </FloatingElement>
        
        <FloatingElement delay={500} duration={3500} style={{ position: 'absolute', top: 280, left: 40 }}>
          <CloudPastel width={90} height={60} />
        </FloatingElement>
        
        <FloatingElement delay={1500} duration={4500} style={{ position: 'absolute', bottom: 180, right: 80 }}>
          <WelcomeFlower width={60} height={60} />
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
