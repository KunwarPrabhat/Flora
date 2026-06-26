import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  useColorScheme, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Image,
  FlatList,
  Modal
} from 'react-native';
import { useRouter } from 'expo-router';
import { useUser, Mood } from '@/context/UserContext';
import { Colors } from '@/constants/theme';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import MoodIcon, { moodIcons } from '@/components/mood-icon';

const fontOptions = [
  { id: 'Quicksand_500Medium', label: 'Cozy' },
  { id: 'DancingScript_700Bold', label: 'Cursive' },
  { id: 'System', label: 'Classic' },
];

const colorOptions = [
  '#FFF5F5', // Soft pink
  '#FAF6F0', // Warm Oat
  '#F0FDF4', // Dewy green
  '#FFF8F0', // Peach
  '#E6E8D2', // Sage
  '#F3E8FF', // Soft purple
];

export default function NewEntryScreen() {
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedFont, setSelectedFont] = useState('Quicksand_500Medium');
  const [cardColor, setCardColor] = useState<string | null>(null);
  
  // Modals visibility
  const [fontModalVisible, setFontModalVisible] = useState(false);
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');

  const { addEntry, theme } = useUser();
  const router = useRouter();

  const handleSave = async () => {
    if (content.trim()) {
      await addEntry({
        id: Date.now().toString(),
        date: format(new Date(), 'MMM dd, yyyy'),
        content: content.trim(),
        mood: selectedMood || undefined,
        tags: tags.length > 0 ? tags : ['diary'],
        photos: photos,
        fontFamily: selectedFont,
        backgroundColor: cardColor || undefined
      });
      router.back();
    }
  };

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required to add photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const handleAddTag = () => {
    if (newTagInput.trim() && !tags.includes(newTagInput.trim())) {
      setTags([...tags, newTagInput.trim()]);
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: cardColor || theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
          <Ionicons name="close" size={28} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>New Memory</Text>
        <TouchableOpacity onPress={handleSave} style={styles.headerBtn} disabled={!content.trim()}>
          <Text style={[styles.saveText, { color: content.trim() ? theme.primary : theme.textSecondary }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={[styles.date, { color: theme.textSecondary }]}>{format(new Date(), 'EEEE, MMMM do yyyy')}</Text>
        
        <View style={styles.moodSelector}>
          {(Object.keys(moodIcons) as Mood[]).map((m) => {
            const IconComponent = moodIcons[m];
            return (
              <TouchableOpacity 
                key={m} 
                onPress={() => setSelectedMood(m)}
                style={[
                  styles.moodBtn, 
                  selectedMood === m && { backgroundColor: theme.primary, borderColor: theme.primary }
                ]}
              >
                <IconComponent width={32} height={32} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Display attached photos */}
        {photos.length > 0 && (
          <ScrollView horizontal style={styles.photoContainer} showsHorizontalScrollIndicator={false}>
            {photos.map((uri, idx) => (
              <View key={idx} style={styles.photoWrapper}>
                <Image source={{ uri }} style={styles.photo} />
                <TouchableOpacity 
                  style={styles.photoDeleteBtn}
                  onPress={() => setPhotos(photos.filter((_, i) => i !== idx))}
                >
                  <Ionicons name="close-circle" size={20} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Display tag chips */}
        {tags.length > 0 && (
          <View style={styles.tagChips}>
            {tags.map((tag, idx) => (
              <TouchableOpacity key={idx} style={[styles.tagChip, { backgroundColor: theme.primary }]} onPress={() => handleRemoveTag(tag)}>
                <Text style={styles.tagChipText}>#{tag} ✕</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TextInput
          style={[
            styles.input, 
            { 
              color: theme.text,
              fontFamily: selectedFont === 'System' ? undefined : selectedFont
            }
          ]}
          placeholder="Dear Diary..."
          placeholderTextColor={theme.textSecondary}
          multiline
          value={content}
          onChangeText={setContent}
          autoFocus
        />
      </ScrollView>
      
      {/* Toolbar */}
      <View style={[styles.toolbar, { backgroundColor: theme.backgroundElement, borderTopColor: theme.backgroundSelected }]}>
        <TouchableOpacity style={styles.toolBtn} onPress={handlePickImage}>
          <Ionicons name="image" size={24} color={theme.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolBtn} onPress={() => setFontModalVisible(true)}>
          <Ionicons name="text" size={24} color={theme.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolBtn} onPress={() => setColorModalVisible(true)}>
          <Ionicons name="color-palette" size={24} color={theme.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toolBtn} onPress={() => setTagModalVisible(true)}>
          <Ionicons name="pricetag" size={24} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Font Selection Modal */}
      <Modal visible={fontModalVisible} transparent animationType="slide" onRequestClose={() => setFontModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Choose Font Style</Text>
              <TouchableOpacity onPress={() => setFontModalVisible(false)}>
                <Ionicons name="close" size={28} color={theme.text} />
              </TouchableOpacity>
            </View>
            {fontOptions.map((font) => (
              <TouchableOpacity
                key={font.id}
                style={[
                  styles.selectItem,
                  { backgroundColor: selectedFont === font.id ? theme.backgroundElement : 'transparent', borderRadius: 16 }
                ]}
                onPress={() => {
                  setSelectedFont(font.id);
                  setFontModalVisible(false);
                }}
              >
                <Text style={[styles.selectLabel, { color: theme.text, fontFamily: font.id === 'System' ? undefined : font.id }]}>
                  {font.label} Text Style
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Color Selection Modal */}
      <Modal visible={colorModalVisible} transparent animationType="slide" onRequestClose={() => setColorModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Choose Card Color</Text>
              <TouchableOpacity onPress={() => setColorModalVisible(false)}>
                <Ionicons name="close" size={28} color={theme.text} />
              </TouchableOpacity>
            </View>
            <View style={styles.colorsGrid}>
              <TouchableOpacity
                style={[styles.colorBubble, { backgroundColor: theme.background, borderWidth: 1, borderColor: theme.text }]}
                onPress={() => {
                  setCardColor(null);
                  setColorModalVisible(false);
                }}
              >
                <Ionicons name="ban" size={24} color={theme.textSecondary} />
              </TouchableOpacity>
              {colorOptions.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[styles.colorBubble, { backgroundColor: color }]}
                  onPress={() => {
                    setCardColor(color);
                    setColorModalVisible(false);
                  }}
                />
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* Tags Input Modal */}
      <Modal visible={tagModalVisible} transparent animationType="slide" onRequestClose={() => setTagModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>Add Tags</Text>
              <TouchableOpacity onPress={() => setTagModalVisible(false)}>
                <Ionicons name="close" size={28} color={theme.text} />
              </TouchableOpacity>
            </View>
            <View style={styles.tagInputWrapper}>
              <TextInput
                style={[styles.tagInput, { color: theme.text, borderColor: theme.primary }]}
                placeholder="tag name..."
                placeholderTextColor={theme.textSecondary}
                value={newTagInput}
                onChangeText={setNewTagInput}
              />
              <TouchableOpacity style={[styles.tagAddBtn, { backgroundColor: theme.primary }]} onPress={handleAddTag}>
                <Text style={styles.tagAddBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  headerBtn: {
    padding: 5,
  },
  headerTitle: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 24,
  },
  saveText: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 18,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  date: {
    fontFamily: 'Quicksand_500Medium',
    fontSize: 14,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
  moodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 10,
  },
  moodBtn: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  moodEmoji: {
    fontSize: 24,
  },
  input: {
    fontSize: 18,
    lineHeight: 28,
    minHeight: 300,
    textAlignVertical: 'top',
  },
  photoContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  photoWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 16,
  },
  photoDeleteBtn: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  tagChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  tagChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagChipText: {
    fontFamily: 'Quicksand_700Bold',
    fontSize: 12,
    color: '#fff',
  },
  toolbar: {
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 30,
    borderTopWidth: 1,
    justifyContent: 'space-around',
  },
  toolBtn: {
    padding: 10,
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
  selectItem: {
    padding: 15,
    marginBottom: 5,
  },
  selectLabel: {
    fontSize: 16,
    fontFamily: 'Quicksand_700Bold',
  },
  colorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  colorBubble: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  tagInput: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    fontFamily: 'Quicksand_500Medium',
  },
  tagAddBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  tagAddBtnText: {
    fontFamily: 'Quicksand_700Bold',
    color: '#fff',
  },
});
