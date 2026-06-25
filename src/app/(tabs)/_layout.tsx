import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const scheme = useColorScheme();
  const theme = Colors[scheme === 'dark' ? 'dark' : 'light'];

  return (
    <NativeTabs
      backgroundColor={theme.backgroundElement}
      activeTintColor={theme.primary}
      inactiveTintColor={theme.textSecondary}
      labelStyle={{ fontFamily: 'Quicksand_700Bold', fontSize: 10 }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon>
          <Ionicons name="home" size={24} color={theme.textSecondary} />
        </NativeTabs.Trigger.Icon>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="journal">
        <NativeTabs.Trigger.Label>Journal</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon>
          <Ionicons name="book" size={24} color={theme.textSecondary} />
        </NativeTabs.Trigger.Icon>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="garden">
        <NativeTabs.Trigger.Label>Garden</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon>
          <Ionicons name="leaf" size={24} color={theme.textSecondary} />
        </NativeTabs.Trigger.Icon>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="memories">
        <NativeTabs.Trigger.Label>Memories</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon>
          <Ionicons name="time" size={24} color={theme.textSecondary} />
        </NativeTabs.Trigger.Icon>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon>
          <Ionicons name="person" size={24} color={theme.textSecondary} />
        </NativeTabs.Trigger.Icon>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
