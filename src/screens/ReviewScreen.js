import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  Modal,
  Animated,
} from 'react-native';
import { GTColors, GTFonts, GTFontStyles } from '../theme';
import { useReviews } from '../context/ReviewsContext';

export default function ReviewScreen() {
  const [starRating, setStarRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [comments, setComments] = useState('');
  const [reportChecked, setReportChecked] = useState(false);
  const [friendChecked, setFriendChecked] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [confirmScaleAnim] = useState(new Animated.Value(0));
  const [successScaleAnim] = useState(new Animated.Value(0));
  
  const { addReview } = useReviews();
  const reviewedUserId = 'gamerguy122'; // In a real app, this would come from navigation params
  const reviewerName = 'CurrentUser'; // In a real app, this would come from auth context

  // Convert star rating to overallExp format
  const getOverallExpFromStars = (stars) => {
    if (stars === 0) return null;
    if (stars <= 1) return 'bad';
    if (stars <= 2) return 'okay';
    if (stars <= 3) return 'good';
    return 'great';
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    // Validate that a rating is selected
    if (starRating === 0) {
      alert('Please select a star rating before submitting.');
      return;
    }
    // Show confirmation modal
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);
    
    const overallExp = getOverallExpFromStars(starRating);
    
    // Add review to context
    addReview({
      reviewedUserId,
      reviewerName,
      overallExp,
      selectedTags,
      comments,
      reportChecked,
      friendChecked,
    });
    
    // Animate success modal
    setShowSuccessModal(true);
    Animated.spring(successScaleAnim, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
    
    console.log('Submit feedback', {
      starRating,
      overallExp,
      selectedTags,
      comments,
      reportChecked,
      friendChecked,
    });
    
    // Reset form after a delay
    setTimeout(() => {
      setStarRating(0);
      setSelectedTags([]);
      setComments('');
      setReportChecked(false);
      setFriendChecked(false);
      setShowSuccessModal(false);
      successScaleAnim.setValue(0);
    }, 2000);
  };

  const handleCancelSubmit = () => {
    setShowConfirmModal(false);
  };

  const handleSkip = () => {
    console.log('Skip feedback');
    // Handle skip logic
  };

  React.useEffect(() => {
    if (showConfirmModal) {
      Animated.spring(confirmScaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start();
    } else {
      confirmScaleAnim.setValue(0);
    }
  }, [showConfirmModal]);

  const getRatingLabel = (stars) => {
    if (stars === 0) return 'Tap to rate';
    if (stars === 1) return 'Poor';
    if (stars === 2) return 'Fair';
    if (stars === 3) return 'Good';
    if (stars === 4) return 'Very Good';
    return 'Excellent';
  };

  const feedbackTags = [
    'Friendly Player',
    'Good Comms',
    'Great Teammate',
    'Strong Skills',
    'Helpful',
    'Not a good match',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.gameIcon}>
            <Image
              source={require('../../assets/valorant.png')}
              style={styles.gameIconImage}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.headerTextContainer}>
            <View style={styles.headerTopRow}>
              <View style={styles.profilePictureSmall}>
                <View style={styles.profileIconSmall}>
                  <View style={styles.iconHeadSmall} />
                  <View style={styles.iconBodySmall} />
                </View>
              </View>
              <Text style={styles.mainQuestion}>How was your game with gamerguy122?</Text>
            </View>
            <Text style={styles.gameSubtitle}>Playing Valorant.</Text>
          </View>
        </View>

        {/* Section 1: Overall Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>1. Overall Experience</Text>
          <View style={styles.starRatingContainer}>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setStarRating(star)}
                  activeOpacity={0.7}
                  style={styles.starButton}
                >
                  <Text style={[
                    styles.star,
                    star <= starRating && styles.starFilled
                  ]}>
                    {star <= starRating ? '★' : '☆'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.ratingLabel}>{getRatingLabel(starRating)}</Text>
          </View>
        </View>

        {/* Section 2: What did you think? */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>2. What did you think?</Text>
          <View style={styles.tagsContainer}>
            {feedbackTags.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.feedbackTag,
                  selectedTags.includes(tag) && styles.feedbackTagSelected,
                ]}
                onPress={() => toggleTag(tag)}
                activeOpacity={0.8}
              >
                <Text style={styles.feedbackTagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Section 3: Add Comments */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>3. Add Comments</Text>
            <TextInput
            style={styles.commentsInput}
            placeholder="e.g., Good callouts!"
            placeholderTextColor={GTColors.textMuted}
            value={comments}
            onChangeText={setComments}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Report Checkbox */}
        <TouchableOpacity
          style={styles.reportContainer}
          onPress={() => setReportChecked(!reportChecked)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, reportChecked && styles.checkboxChecked]}>
            {reportChecked && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.reportText}>Report gamerguy122</Text>
        </TouchableOpacity>

        {/* Friend Checkbox */}
        <TouchableOpacity
          style={styles.reportContainer}
          onPress={() => setFriendChecked(!friendChecked)}
          activeOpacity={0.8}
        >
          <View style={[styles.checkbox, friendChecked && styles.checkboxFriend]}>
            {friendChecked && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.reportText}>Add gamerguy122 as Friend</Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </TouchableOpacity>

        {/* Skip Link */}
        <TouchableOpacity onPress={handleSkip} style={styles.skipContainer}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={handleCancelSubmit}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [{ scale: confirmScaleAnim }],
              },
            ]}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Submit Feedback?</Text>
              <Text style={styles.modalText}>
                Are you sure you want to submit this feedback? This action cannot be undone.
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonCancel]}
                  onPress={handleCancelSubmit}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalButtonTextCancel}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonConfirm]}
                  onPress={handleConfirmSubmit}
                  activeOpacity={0.8}
                >
                  <Text style={styles.modalButtonTextConfirm}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [{ scale: successScaleAnim }],
              },
            ]}
          >
            <View style={styles.modalContent}>
              <Text style={styles.successEmoji}>✓</Text>
              <Text style={styles.modalTitle}>Feedback Submitted!</Text>
              <Text style={styles.modalText}>
                Thank you for your feedback. It helps improve the community!
              </Text>
            </View>
          </Animated.View>
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 100,
  },
  headerSection: {
    marginBottom: 30,
    alignItems: 'center',
  },
  gameIcon: {
    width: 60,
    height: 60,
    backgroundColor: GTColors.darkCard,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
    overflow: 'hidden',
  },
  gameIconImage: {
    width: '100%',
    height: '100%',
  },
  headerTextContainer: {
    width: '100%',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profilePictureSmall: {
    width: 40,
    height: 40,
    backgroundColor: '#888',
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconSmall: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconHeadSmall: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 2,
  },
  iconBodySmall: {
    width: 12,
    height: 6,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  mainQuestion: {
    flex: 1,
    ...GTFontStyles.heading,
    fontSize: 20,
    color: GTColors.textPrimary,
  },
  gameSubtitle: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.textMuted,
    marginLeft: 50,
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
  starRatingContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  starButton: {
    padding: 8,
    marginHorizontal: 5,
  },
  star: {
    fontSize: 40,
    color: GTColors.goldDark,
  },
  starFilled: {
    color: GTColors.gold,
  },
  ratingLabel: {
    ...GTFontStyles.body,
    fontSize: 16,
    color: GTColors.textPrimary,
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  feedbackTag: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
    backgroundColor: GTColors.darkCard,
    margin: 5,
  },
  feedbackTagSelected: {
    backgroundColor: GTColors.gold,
    borderColor: GTColors.goldDark,
  },
  feedbackTagText: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.textPrimary,
  },
  commentsInput: {
    backgroundColor: GTColors.darkCard,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
    borderRadius: 8,
    padding: 15,
    fontFamily: GTFonts.regular,
    fontSize: 14,
    color: GTColors.textPrimary,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  reportContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#000',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  checkboxChecked: {
    backgroundColor: GTColors.navy,
  },
  checkboxFriend: {
    backgroundColor: GTColors.gold,
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  reportText: {
    ...GTFontStyles.body,
    fontSize: 16,
    color: GTColors.textPrimary,
  },
  submitButton: {
    backgroundColor: GTColors.gold,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  submitButtonText: {
    ...GTFontStyles.button,
    fontSize: 16,
    color: GTColors.darkBg,
  },
  skipContainer: {
    alignItems: 'center',
  },
  skipText: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.textMuted,
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
    borderWidth: 3,
    borderColor: GTColors.gold,
    overflow: 'hidden',
  },
  modalContent: {
    padding: 30,
    alignItems: 'center',
  },
  modalTitle: {
    ...GTFontStyles.heading,
    fontSize: 24,
    color: GTColors.gold,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    ...GTFontStyles.body,
    fontSize: 16,
    color: GTColors.textPrimary,
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    marginHorizontal: 7.5,
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
    fontSize: 16,
    color: GTColors.textPrimary,
  },
  modalButtonTextConfirm: {
    ...GTFontStyles.button,
    fontSize: 16,
    color: GTColors.darkBg,
  },
  successEmoji: {
    fontSize: 64,
    marginBottom: 15,
  },
});
