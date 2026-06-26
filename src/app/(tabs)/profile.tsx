import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Modal, FlatList, ImageBackground } from 'react-native';
import { useUser, Vibe } from '@/context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Themes } from '@/constants/theme';

import TabProfileWomen from '../../assets/images/tabs/tab_profile_women.svg';
import TabProfileMen from '../../assets/images/tabs/tab_profile_men.svg';

const vibeImages = {
  floral: require('../../assets/images/worlds/soft.jpg'),
  cafe: require('../../assets/images/worlds/cozy.jpg'),
  moonlight: require('../../assets/images/worlds/moonlight.jpg'),
  fairy: require('../../assets/images/worlds/garden.jpg'),
  pastel: require('../../assets/images/worlds/pastel.jpg'),
  cottagecore: require('../../assets/images/worlds/cottage.jpg'),
};

const vibeOptions: { id: Vibe; label: string }[] = [
  { id: 'floral', label: 'Soft & Floral' },
  { id: 'cafe', label: 'Cozy Cafe' },
  { id: 'moonlight', label: 'Moonlight Dreams' },
  { id: 'fairy', label: 'Fairy Garden' },
  { id: 'pastel', label: 'Cute Pastel' },
  { id: 'cottagecore', label: 'Cottagecore' },
];

export default function ProfileScreen() {
  const { 
    name, 
    age, 
    gender,
    vibe, 
    lockEnabled, 
    remindersEnabled, 
    setVibe, 
    setLockEnabled, 
    setRemindersEnabled, 
    resetApp, 
    theme 
  } = useUser();

  const [themeModalVisible, setThemeModalVisible] = useState(false);
  const router = useRouter();

  const handleReset = async () => {
    await resetApp();
    router.replace('/onboarding');
  };

  const getVibeName = (vibeId: Vibe | null) => {
    const found = vibeOptions.find(o => o.id === vibeId);
    return found ? found.label : 'Default';
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>My World</Text>
      </View>

      <View style={styles.content}>
        <View style={[styles.profileCard, { backgroundColor: theme.backgroundElement }]}>
          <View style={styles.avatarCircleLarge}>
            {gender === 'male' ? (
              <TabProfileMen width={90} height={90} />
            ) : (
              <TabProfileWomen width={90} height={90} />
            )}
          </View>
          <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
          <Text style={[styles.details, { color: theme.textSecondary }]}>
            {age} years old • {getVibeName(vibe)}
          </Text>
        </View>

        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Settings</Text>
          
          <TouchableOpacity 
            style={[styles.settingItem, { backgroundColor: theme.backgroundElement }]}
            onPress={() => setThemeModalVisible(true)}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="color-palette" size={24} color={theme.primary} />
              <Text style={[styles.settingText, { color: theme.text }]}>Change Theme</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={[styles.currentThemeText, { color: theme.textSecondary }]}>
                {vibe ? vibe.toUpperCase() : ''}
              </Text>
              <Ionicons name="chevron-forward" size={24} color={theme.textSecondary} />
            </View>
          </TouchableOpacity>

          <View style={[styles.settingItem, { backgroundColor: theme.backgroundElement }]}>
            <View style={styles.settingLeft}>
              <Ionicons name="lock-closed" size={24} color={theme.primary} />
              <Text style={[styles.settingText, { color: theme.text }]}>Journal Lock</Text>
            </View>
            <Switch
              value={lockEnabled}
              onValueChange={setLockEnabled}
              trackColor={{ false: theme.background, true: theme.primary }}
              thumbColor={lockEnabled ? theme.backgroundElement : '#f4f3f4'}
            />
          </View>

          <View style={[styles.settingItem, { backgroundColor: theme.backgroundElement }]}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={24} color={theme.primary} />
              <Text style={[styles.settingText, { color: theme.text }]}>Reminders</Text>
            </View>
            <Switch
              value={remindersEnabled}
              onValueChange={setRemindersEnabled}
              trackColor={{ false: theme.background, true: theme.primary }}
              thumbColor={remindersEnabled ? theme.backgroundElement : '#f4f3f4'}
            />
          </View>
        </View>

        <TouchableOpacity style={[styles.resetButton, { borderColor: theme.textSecondary }]} onPress={handleReset}>
          <Text style={[styles.resetText, { color: theme.textSecondary }]}>Reset App (For Testing)</Text>
        </TouchableOpacity>
      </View>

      {/* Theme Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={themeModalVisible}
        onRequestClose={() => setThemeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Select Vibe</Text>
              <TouchableOpacity onPress={() => setThemeModalVisible(false)}>
                <Ionicons name="close" size={28} color={theme.text} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={vibeOptions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.vibeSelectCard,
                    { 
                      borderColor: vibe === item.id ? theme.primary : 'transparent',
                      borderWidth: vibe === item.id ? 3 : 0,
                    }
                  ]}
                  onPress={async () => {
                    await setVibe(item.id);
                    setThemeModalVisible(false);
                  }}
                >
                  <ImageBackground
                    source={vibeImages[item.id]}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                  />
                  <View style={styles.vibeSelectOverlay} />
                  <Text style={styles.vibeSelectText}>
                    {item.label}
                  </Text>
                  {vibe === item.id && (
                    <Ionicons name="checkmark-circle" size={24} color="#fff" style={styles.checkIcon} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
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
  },
  title: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 32,
  },
  content: {
    padding: 20,
  },
  profileCard: {
    padding: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarCircleLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 24,
    marginBottom: 5,
  },
  details: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 16,
  },
  settingsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 14,
    textTransform: 'uppercase',
    marginBottom: 15,
    marginLeft: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 24,
    marginBottom: 10,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 16,
    marginLeft: 15,
  },
  currentThemeText: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 14,
    marginRight: 5,
    textTransform: 'uppercase',
  },
  resetButton: {
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
  },
  resetText: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 24,
  },
  vibeSelectCard: {
    height: 70,
    borderRadius: 16,
    marginBottom: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  vibeSelectOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  vibeSelectText: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 16,
    color: '#fff',
    flex: 1,
    zIndex: 1,
  },
  checkIcon: {
    zIndex: 1,
  },
});
