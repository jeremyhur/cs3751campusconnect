import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { GTColors, GTFonts, GTFontStyles } from '../theme';

export default function ProfileScreen() {
  const [username, setUsername] = useState('Gamer123');
  const [age, setAge] = useState('20');
  const [school, setSchool] = useState('GT');
  const [major, setMajor] = useState('CS');
  const [gamingStyle, setGamingStyle] = useState('Competitive');
  const [selectedGenres, setSelectedGenres] = useState(['FPS', 'MOBA']);
  const [selectedTags, setSelectedTags] = useState(['Competitive', 'Late Nights']);
  const [interests, setInterests] = useState(['Rock Climbing', 'Crochet', 'Guitar']);
  const [newInterest, setNewInterest] = useState('');

  const gamingStyles = ['Competitive', 'Casual', 'Ranked', 'Social'];
  const genres = ['FPS', 'MOBA', 'Battle Royale', 'RPG', 'Strategy', 'Indie', 'Racing', 'Sports'];
  const availableTags = ['Competitive', 'Casual', 'Late Nights', 'Early Bird', 'Friendly', 'Team Player', 'Helpful', 'Chill'];

  const toggleGenre = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const removeInterest = (interest) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const handleSave = () => {
    console.log('Saving profile:', {
      username,
      age,
      school,
      major,
      gamingStyle,
      selectedGenres,
      selectedTags,
      interests,
    });
    // Handle save logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Profile Customization</Text>
            <Text style={styles.subtitle}>Edit your gaming profile</Text>
          </View>

          {/* Profile Picture */}
          <View style={styles.profilePictureSection}>
            <View style={styles.profilePicture}>
              <View style={styles.profileIcon}>
                <View style={styles.iconHead} />
                <View style={styles.iconBody} />
              </View>
            </View>
            <TouchableOpacity style={styles.changePictureButton}>
              <Text style={styles.changePictureText}>Change Picture</Text>
            </TouchableOpacity>
          </View>

          {/* Basic Info */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Basic Information</Text>
            
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter username"
              placeholderTextColor={GTColors.textMuted}
            />

            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="Enter age"
              placeholderTextColor={GTColors.textMuted}
              keyboardType="numeric"
            />

            <Text style={styles.label}>School</Text>
            <TextInput
              style={styles.input}
              value={school}
              onChangeText={setSchool}
              placeholder="Enter school"
              placeholderTextColor={GTColors.textMuted}
            />

            <Text style={styles.label}>Major</Text>
            <TextInput
              style={styles.input}
              value={major}
              onChangeText={setMajor}
              placeholder="Enter major"
              placeholderTextColor={GTColors.textMuted}
            />
          </View>

          {/* Gaming Style */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Gaming Style</Text>
            <View style={styles.optionsContainer}>
              {gamingStyles.map((style) => (
                <TouchableOpacity
                  key={style}
                  style={[
                    styles.optionButton,
                    gamingStyle === style && styles.optionButtonSelected,
                  ]}
                  onPress={() => setGamingStyle(style)}
                >
                  <Text
                    style={[
                      styles.optionButtonText,
                      gamingStyle === style && styles.optionButtonTextSelected,
                    ]}
                  >
                    {style}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Favorite Genres */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Favorite Genres</Text>
            <View style={styles.tagsContainer}>
              {genres.map((genre) => (
                <TouchableOpacity
                  key={genre}
                  style={[
                    styles.genreTag,
                    selectedGenres.includes(genre) && styles.genreTagSelected,
                  ]}
                  onPress={() => toggleGenre(genre)}
                >
                  <Text
                    style={[
                      styles.genreTagText,
                      selectedGenres.includes(genre) && styles.genreTagTextSelected,
                    ]}
                  >
                    {genre}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Tags */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Tags</Text>
            <View style={styles.tagsContainer}>
              {availableTags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={[
                    styles.tag,
                    selectedTags.includes(tag) && styles.tagSelected,
                  ]}
                  onPress={() => toggleTag(tag)}
                >
                  <Text
                    style={[
                      styles.tagText,
                      selectedTags.includes(tag) && styles.tagTextSelected,
                    ]}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Interests */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Interests</Text>
            <View style={styles.interestsContainer}>
              {interests.map((interest, index) => (
                <View key={index} style={styles.interestChip}>
                  <Text style={styles.interestChipText}>{interest}</Text>
                  <TouchableOpacity
                    onPress={() => removeInterest(interest)}
                    style={styles.removeInterestButton}
                  >
                    <Text style={styles.removeInterestText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View style={styles.addInterestContainer}>
              <TextInput
                style={styles.addInterestInput}
                value={newInterest}
                onChangeText={setNewInterest}
                placeholder="Add interest..."
                placeholderTextColor={GTColors.textMuted}
                onSubmitEditing={addInterest}
              />
              <TouchableOpacity
                style={styles.addInterestButton}
                onPress={addInterest}
              >
                <Text style={styles.addInterestButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GTColors.darkBg,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    ...GTFontStyles.heading,
    fontSize: 28,
    color: GTColors.gold,
    marginBottom: 5,
  },
  subtitle: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.textMuted,
  },
  profilePictureSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profilePicture: {
    width: 120,
    height: 120,
    backgroundColor: GTColors.gold,
    borderRadius: 12,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  profileIcon: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconHead: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: GTColors.darkBg,
    marginBottom: 5,
  },
  iconBody: {
    width: 40,
    height: 20,
    borderWidth: 3,
    borderColor: GTColors.darkBg,
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  changePictureButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  changePictureText: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.textPrimary,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    ...GTFontStyles.heading,
    fontSize: 18,
    color: GTColors.gold,
    marginBottom: 15,
  },
  label: {
    ...GTFontStyles.label,
    fontSize: 14,
    color: GTColors.textPrimary,
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: GTColors.darkCard,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
    borderRadius: 8,
    padding: 15,
    fontFamily: GTFonts.regular,
    fontSize: 16,
    color: GTColors.textPrimary,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
    backgroundColor: GTColors.darkCard,
    margin: 5,
  },
  optionButtonSelected: {
    backgroundColor: GTColors.gold,
    borderColor: GTColors.goldDark,
  },
  optionButtonText: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.textPrimary,
  },
  optionButtonTextSelected: {
    color: GTColors.darkBg,
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  genreTag: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
    backgroundColor: GTColors.darkCard,
    margin: 5,
  },
  genreTagSelected: {
    backgroundColor: GTColors.gold,
    borderColor: GTColors.goldDark,
  },
  genreTagText: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.textPrimary,
  },
  genreTagTextSelected: {
    color: GTColors.darkBg,
    fontWeight: 'bold',
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
    backgroundColor: GTColors.darkCard,
    margin: 5,
  },
  tagSelected: {
    backgroundColor: GTColors.gold,
    borderColor: GTColors.goldDark,
  },
  tagText: {
    ...GTFontStyles.body,
    fontSize: 12,
    color: GTColors.textPrimary,
  },
  tagTextSelected: {
    color: GTColors.darkBg,
    fontWeight: 'bold',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    marginHorizontal: -5,
  },
  interestChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GTColors.gold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    margin: 5,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  interestChipText: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.darkBg,
    marginRight: 8,
  },
  removeInterestButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeInterestText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 14,
  },
  addInterestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addInterestInput: {
    flex: 1,
    backgroundColor: GTColors.darkCard,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
    borderRadius: 8,
    padding: 12,
    fontFamily: GTFonts.regular,
    fontSize: 14,
    color: GTColors.textPrimary,
    marginRight: 10,
  },
  addInterestButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: GTColors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  addInterestButtonText: {
    ...GTFontStyles.button,
    fontSize: 24,
    color: GTColors.darkBg,
  },
  saveButton: {
    backgroundColor: GTColors.gold,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  saveButtonText: {
    ...GTFontStyles.button,
    fontSize: 18,
    color: GTColors.darkBg,
  },
});
