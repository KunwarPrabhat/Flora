import { Tabs } from 'expo-router';
import { useUser } from '@/context/UserContext';
import { View } from 'react-native';

import TabHome from '../../assets/images/tabs/tab_home.svg';
import TabJournal from '../../assets/images/tabs/tab_journal.svg';
import TabMemories from '../../assets/images/tabs/tab_memories.svg';
import TabProfile from '../../assets/images/tabs/tab_profile_women.svg';

export default function TabLayout() {
  const { theme } = useUser();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: theme.backgroundElement,
          borderTopWidth: 0,
          elevation: 5,
          shadowOpacity: 0.1,
          shadowRadius: 5,
          height: 60,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarLabelStyle: { fontFamily: 'Quicksand_700Bold', fontSize: 10 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={{ opacity: focused ? 1 : 0.5, transform: [{ scale: focused ? 1.1 : 1 }] }}>
              <TabHome width={28} height={28} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="journal"
        options={{
          title: 'Journal',
          tabBarIcon: ({ focused }) => (
            <View style={{ opacity: focused ? 1 : 0.5, transform: [{ scale: focused ? 1.1 : 1 }] }}>
              <TabJournal width={28} height={28} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="garden"
        options={{
          href: null, // This hides it from the bottom tab bar completely!
        }}
      />
      <Tabs.Screen
        name="memories"
        options={{
          title: 'Memories',
          tabBarIcon: ({ focused }) => (
            <View style={{ opacity: focused ? 1 : 0.5, transform: [{ scale: focused ? 1.1 : 1 }] }}>
              <TabMemories width={28} height={28} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View style={{ opacity: focused ? 1 : 0.5, transform: [{ scale: focused ? 1.1 : 1 }] }}>
              <TabProfile width={28} height={28} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
