import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';
import { useFonts, Quicksand_400Regular, Quicksand_500Medium, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { DancingScript_400Regular, DancingScript_700Bold } from '@expo-google-fonts/dancing-script';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { UserProvider, useUser } from '@/context/UserContext';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const { isOnboardingComplete } = useUser();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // If not in onboarding and not complete, redirect to onboarding
    const inOnboardingGroup = segments[0] === 'onboarding';

    if (!isOnboardingComplete && !inOnboardingGroup) {
      router.replace('/onboarding');
    } else if (isOnboardingComplete && inOnboardingGroup) {
      router.replace('/(tabs)');
    }
  }, [isOnboardingComplete, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="new-entry" options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_700Bold,
    DancingScript_400Regular,
    DancingScript_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <UserProvider>
        <AnimatedSplashOverlay />
        <InitialLayout />
      </UserProvider>
    </ThemeProvider>
  );
}
