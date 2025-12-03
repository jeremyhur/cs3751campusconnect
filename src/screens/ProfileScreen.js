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
  Modal,
  Alert,
  FlatList,
  Dimensions,
} from 'react-native';
import { GTColors, GTFonts, GTFontStyles } from '../theme';
import { useReviews } from '../context/ReviewsContext';

const { width } = Dimensions.get('window');

// Helper function to convert overallExp to star rating
const getStarRating = (overallExp) => {
  switch (overallExp) {
    case 'bad':
      return 1;
    case 'okay':
      return 2;
    case 'good':
      return 3;
    case 'great':
      return 5;
    default:
      return 0;
  }
};

// Star rating component
const StarRating = ({ rating }) => {
  return (
    <View style={starRatingStyles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Text key={star} style={starRatingStyles.star}>
          {star <= rating ? '★' : '☆'}
        </Text>
      ))}
    </View>
  );
};

const starRatingStyles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 18,
    color: GTColors.gold,
    marginLeft: 2,
  },
});

export default function ProfileScreen() {
  const [username, setUsername] = useState('Gamer123');
  const [age, setAge] = useState('20');
  const [school, setSchool] = useState('GT');
  const [major, setMajor] = useState('CS');
  const [bio, setBio] = useState('');
  const [gamingStyle, setGamingStyle] = useState('Competitive');
  const [selectedGenres, setSelectedGenres] = useState(['FPS', 'MOBA']);
  const [selectedGames, setSelectedGames] = useState([]);
  const [newGame, setNewGame] = useState('');
  const [competitiveRank, setCompetitiveRank] = useState('');
  const [rankVerification, setRankVerification] = useState('');
  const [rankVerified, setRankVerified] = useState(false);
  const [selectedTags, setSelectedTags] = useState(['Competitive', 'Late Nights']);
  const [interests, setInterests] = useState(['Rock Climbing', 'Crochet', 'Guitar']);
  const [newInterest, setNewInterest] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [reportReason, setReportReason] = useState('');

  const { getReviewsForUser, reportReview } = useReviews();
  const userId = 'current-user-id'; // In a real app, this would come from auth context
  const userReviews = getReviewsForUser(userId);

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

  const addGame = () => {
    if (newGame.trim() && !selectedGames.includes(newGame.trim())) {
      setSelectedGames([...selectedGames, newGame.trim()]);
      setNewGame('');
    }
  };

  const removeGame = (game) => {
    setSelectedGames(selectedGames.filter(g => g !== game));
  };

  const handleVerifyRank = () => {
    // In a real app, this would verify the rank with the game's API or require screenshot
    // For now, we'll just mark it as verified if verification text is provided
    if (competitiveRank.trim() && rankVerification.trim()) {
      setRankVerified(true);
      // In production, this would call an API to verify
      console.log('Verifying rank:', competitiveRank, 'with proof:', rankVerification);
    }
  };

  const handleReportReview = (reviewId) => {
    setSelectedReviewId(reviewId);
    setShowReportModal(true);
  };

  const submitReport = () => {
    if (selectedReviewId && reportReason.trim()) {
      reportReview(selectedReviewId, reportReason);
      Alert.alert('Report Submitted', 'Thank you for reporting this review. Our moderation team will review it.');
      setShowReportModal(false);
      setSelectedReviewId(null);
      setReportReason('');
    }
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
    // Validate mandatory fields
    if (selectedGames.length === 0) {
      alert('Please add at least one specific game you play.');
      return;
    }
    
    console.log('Saving profile:', {
      username,
      age,
      school,
      major,
      bio,
      gamingStyle,
      selectedGenres,
      selectedGames,
      competitiveRank,
      rankVerified,
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

            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={bio}
              onChangeText={setBio}
              placeholder="Tell us about yourself..."
              placeholderTextColor={GTColors.textMuted}
              multiline
              numberOfLines={4}
              maxLength={500}
            />
            <Text style={styles.charCount}>{bio.length}/500</Text>
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

          {/* Specific Games Played - MANDATORY */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>
              Games <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.gamesContainer}>
              {selectedGames.map((game, index) => (
                <View key={index} style={styles.gameChip}>
                  <Text style={styles.gameChipText}>{game}</Text>
                  <TouchableOpacity
                    onPress={() => removeGame(game)}
                    style={styles.removeGameButton}
                  >
                    <Text style={styles.removeGameText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <View style={styles.addGameContainer}>
              <TextInput
                style={styles.addGameInput}
                value={newGame}
                onChangeText={setNewGame}
                placeholder="Add game (e.g., Valorant, League of Legends)"
                placeholderTextColor={GTColors.textMuted}
                onSubmitEditing={addGame}
              />
              <TouchableOpacity
                style={styles.addGameButton}
                onPress={addGame}
              >
                <Text style={styles.addGameButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            {selectedGames.length === 0 && (
              <Text style={styles.errorText}>At least one game is required</Text>
            )}
          </View>

          {/* Competitive Rank - OPTIONAL */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Competitive Rank (Optional)</Text>
            <TextInput
              style={styles.input}
              value={competitiveRank}
              onChangeText={setCompetitiveRank}
              placeholder="e.g., Valorant: Immortal 2, League: Diamond 1"
              placeholderTextColor={GTColors.textMuted}
            />
            {competitiveRank && !rankVerified && (
              <>
                <Text style={styles.label}>Verification (Screenshot link or proof)</Text>
                <TextInput
                  style={styles.input}
                  value={rankVerification}
                  onChangeText={setRankVerification}
                  placeholder="Paste link to screenshot or provide proof"
                  placeholderTextColor={GTColors.textMuted}
                />
                <TouchableOpacity
                  style={styles.verifyButton}
                  onPress={handleVerifyRank}
                >
                  <Text style={styles.verifyButtonText}>Verify Rank</Text>
                </TouchableOpacity>
              </>
            )}
            {rankVerified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓ Verified</Text>
              </View>
            )}
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

          {/* Reviews Section */}
          <View style={styles.section}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionHeader}>Reviews & Feedback</Text>
              {userReviews.length > 0 && (
                <Text style={styles.reviewCount}>
                  {userReviews.length} {userReviews.length === 1 ? 'review' : 'reviews'}
                </Text>
              )}
            </View>
            {userReviews.length === 0 ? (
              <Text style={styles.noReviewsText}>No reviews yet</Text>
            ) : (
              <FlatList
                data={userReviews}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item: review }) => (
                  <View style={styles.reviewCard}>
                    <View style={styles.reviewHeader}>
                      <View>
                        <Text style={styles.reviewerName}>{review.reviewerName || 'Anonymous'}</Text>
                        <Text style={styles.reviewDate}>
                          {new Date(review.createdAt).toLocaleDateString()}
                        </Text>
                      </View>
                      <View style={styles.reviewRating}>
                        {review.overallExp && (
                          <StarRating rating={getStarRating(review.overallExp)} />
                        )}
                      </View>
                    </View>
                    {review.selectedTags && review.selectedTags.length > 0 && (
                      <View style={styles.reviewTagsContainer}>
                        {review.selectedTags.map((tag, index) => (
                          <View key={index} style={styles.reviewTag}>
                            <Text style={styles.reviewTagText}>{tag}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                    {review.comments && (
                      <Text style={styles.reviewComment}>{review.comments}</Text>
                    )}
                    {review.reported && (
                      <Text style={styles.reportedBadge}>⚠️ Under Review</Text>
                    )}
                    <TouchableOpacity
                      style={styles.reportButton}
                      onPress={() => handleReportReview(review.id)}
                    >
                      <Text style={styles.reportButtonText}>Report</Text>
                    </TouchableOpacity>
                  </View>
                )}
                contentContainerStyle={styles.reviewsListContent}
              />
            )}
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Report Modal */}
      <Modal
        visible={showReportModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowReportModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Report Review</Text>
            <Text style={styles.modalSubtitle}>
              Help us maintain a positive community by reporting toxic or inappropriate reviews.
            </Text>
            <TextInput
              style={styles.reportInput}
              value={reportReason}
              onChangeText={setReportReason}
              placeholder="Reason for reporting (e.g., harassment, spam, false information)"
              placeholderTextColor={GTColors.textMuted}
              multiline
              numberOfLines={4}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => {
                  setShowReportModal(false);
                  setReportReason('');
                  setSelectedReviewId(null);
                }}
              >
                <Text style={styles.modalButtonTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={submitReport}
              >
                <Text style={styles.modalButtonTextConfirm}>Submit Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  required: {
    color: '#ff4444',
  },
  bioInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    ...GTFontStyles.body,
    fontSize: 12,
    color: GTColors.textMuted,
    textAlign: 'right',
    marginTop: 5,
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
  gamesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    marginHorizontal: -5,
  },
  gameChip: {
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
  gameChipText: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.darkBg,
    marginRight: 8,
  },
  removeGameButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeGameText: {
    color: GTColors.darkBg,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 14,
  },
  addGameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addGameInput: {
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
  addGameButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: GTColors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  addGameButtonText: {
    ...GTFontStyles.button,
    fontSize: 24,
    color: GTColors.darkBg,
  },
  errorText: {
    ...GTFontStyles.body,
    fontSize: 12,
    color: '#ff4444',
    marginTop: 5,
  },
  verifyButton: {
    backgroundColor: GTColors.gold,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  verifyButtonText: {
    ...GTFontStyles.button,
    fontSize: 14,
    color: GTColors.darkBg,
  },
  verifiedBadge: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#2E7D32',
  },
  verifiedText: {
    ...GTFontStyles.button,
    fontSize: 14,
    color: GTColors.white,
  },
  noReviewsText: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  reviewCard: {
    backgroundColor: GTColors.darkCard,
    borderRadius: 8,
    padding: 15,
    marginRight: 15,
    borderWidth: 1,
    borderColor: GTColors.goldDark,
    width: width - 80, // Full width minus padding
    minHeight: 200,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  reviewerName: {
    ...GTFontStyles.heading,
    fontSize: 16,
    color: GTColors.gold,
  },
  reviewDate: {
    ...GTFontStyles.body,
    fontSize: 12,
    color: GTColors.textMuted,
    marginTop: 2,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewCount: {
    ...GTFontStyles.body,
    fontSize: 12,
    color: GTColors.textMuted,
  },
  reviewsListContent: {
    paddingRight: 20,
  },
  reviewRating: {
    alignItems: 'flex-end',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 18,
    color: GTColors.gold,
    marginLeft: 2,
  },
  reviewTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    marginHorizontal: -3,
  },
  reviewTag: {
    backgroundColor: GTColors.gold,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    margin: 3,
    borderWidth: 1,
    borderColor: GTColors.goldDark,
  },
  reviewTagText: {
    ...GTFontStyles.body,
    fontSize: 11,
    color: GTColors.darkBg,
  },
  reviewComment: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.textPrimary,
    lineHeight: 20,
    marginBottom: 10,
  },
  reportedBadge: {
    ...GTFontStyles.body,
    fontSize: 12,
    color: '#ff9800',
    marginBottom: 8,
  },
  reportButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  reportButtonText: {
    ...GTFontStyles.body,
    fontSize: 12,
    color: '#ff4444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    maxWidth: 400,
    backgroundColor: GTColors.darkCard,
    borderRadius: 20,
    padding: 25,
    borderWidth: 3,
    borderColor: GTColors.gold,
  },
  modalTitle: {
    ...GTFontStyles.heading,
    fontSize: 22,
    color: GTColors.gold,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubtitle: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.textMuted,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  reportInput: {
    backgroundColor: GTColors.darkBg,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
    borderRadius: 8,
    padding: 12,
    fontFamily: GTFonts.regular,
    fontSize: 14,
    color: GTColors.textPrimary,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: GTColors.darkCard,
    borderColor: GTColors.goldDark,
  },
  modalButtonConfirm: {
    backgroundColor: GTColors.gold,
    borderColor: GTColors.goldDark,
  },
  modalButtonTextCancel: {
    ...GTFontStyles.button,
    fontSize: 14,
    color: GTColors.textPrimary,
  },
  modalButtonTextConfirm: {
    ...GTFontStyles.button,
    fontSize: 14,
    color: GTColors.darkBg,
  },
});
