import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
  Image,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GTColors, GTFonts, GTFontStyles } from '../theme';
import { useMatches } from '../context/MatchesContext';
import { useReviews } from '../context/ReviewsContext';
import MatchSuccessModal from '../components/MatchSuccessModal';

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
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Text key={star} style={styles.star}>
          {star <= rating ? '★' : '☆'}
        </Text>
      ))}
    </View>
  );
};

export default function SwipeSyncScreen() {
  const [currentProfile, setCurrentProfile] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [reportReason, setReportReason] = useState('');
  const { addMatch } = useMatches();
  const { getReviewsForUser, reportReview } = useReviews();
  const insets = useSafeAreaInsets();

  // Sample profile data - expanded list
  const profiles = [
    {
      id: 1,
      username: 'Gamer123',
      age: 20,
      school: 'GT',
      major: 'CS',
      reputation: 4.8,
      bio: 'Love competitive gaming and always looking for teammates who communicate well. I play mostly in the evenings and weekends.',
      gamingStyle: 'Competitive',
      genres: ['FPS', 'MOBA', 'Battle Royale'],
      games: ['Valorant', 'League of Legends', 'Apex Legends'],
      competitiveRank: 'Valorant: Diamond 2',
      rankVerified: true,
      interests: ['Rock Climbing', 'Crochet', 'Guitar'],
      tags: ['Competitive', 'Late Nights', 'Friendly'],
      profilePicture: require('../../assets/pfp1.jpeg'),
    },
    {
      id: 2,
      username: 'ProGamer99',
      age: 21,
      school: 'GT',
      major: 'Engineering',
      reputation: 4.9,
      bio: 'Casual gamer who enjoys story-driven games and co-op experiences. Always down for a chill gaming session!',
      gamingStyle: 'Casual',
      genres: ['RPG', 'Strategy', 'Indie'],
      games: ['Baldur\'s Gate 3', 'Stardew Valley', 'Hades'],
      interests: ['Reading', 'Coding', 'Music'],
      tags: ['Team Player', 'Helpful', 'Chill'],
      profilePicture: require('../../assets/pfp2.jpeg'),
    },
    {
      id: 3,
      username: 'ValorantPro',
      age: 19,
      school: 'GT',
      major: 'Computer Science',
      reputation: 4.7,
      bio: 'Immortal rank in Valorant, looking for serious teammates to climb ranked. I stream occasionally and love the competitive scene.',
      gamingStyle: 'Competitive',
      genres: ['FPS', 'Tactical Shooter'],
      games: ['Valorant', 'CS2'],
      competitiveRank: 'Valorant: Immortal 2',
      rankVerified: true,
      interests: ['Esports', 'Streaming', 'Basketball'],
      tags: ['Competitive', 'Early Bird', 'Strategic'],
      profilePicture: require('../../assets/pfp3.jpeg'),
    },
    {
      id: 4,
      username: 'LeagueMaster',
      age: 22,
      school: 'GT',
      major: 'Business',
      reputation: 4.6,
      bio: 'Diamond player in League, main support and ADC. Looking for a consistent team for ranked flex. Also love chess and strategy games!',
      gamingStyle: 'Ranked',
      genres: ['MOBA', 'Strategy'],
      games: ['League of Legends', 'Teamfight Tactics'],
      competitiveRank: 'League of Legends: Diamond 1',
      rankVerified: true,
      interests: ['Chess', 'Finance', 'Cooking'],
      tags: ['Team Player', 'Late Nights', 'Analytical'],
      profilePicture: require('../../assets/pfp4.jpeg'),
    },
    {
      id: 5,
      username: 'CS2Elite',
      age: 20,
      school: 'GT',
      major: 'Mechanical Engineering',
      reputation: 4.9,
      bio: 'Global Elite in CS2, very focused on improving aim and game sense. Looking for teammates who take the game seriously but stay positive.',
      gamingStyle: 'Competitive',
      genres: ['FPS', 'Tactical Shooter'],
      games: ['CS2', 'Valorant'],
      competitiveRank: 'CS2: Global Elite',
      rankVerified: true,
      interests: ['3D Printing', 'Robotics', 'Gym'],
      tags: ['Competitive', 'Precise', 'Focused'],
      profilePicture: require('../../assets/pfp5.jpeg'),
    },
    {
      id: 6,
      username: 'RPGExplorer',
      age: 21,
      school: 'GT',
      major: 'Industrial Design',
      reputation: 4.5,
      bio: 'Passionate about immersive RPGs and indie games. Love exploring rich storylines and beautiful worlds. Always up for co-op adventures!',
      gamingStyle: 'Casual',
      genres: ['RPG', 'Adventure', 'Indie'],
      games: ['Elden Ring', 'Hollow Knight', 'Celeste'],
      interests: ['Art', 'Photography', 'Hiking'],
      tags: ['Creative', 'Chill', 'Explorer'],
    },
    {
      id: 7,
      username: 'ApexLegend',
      age: 19,
      school: 'GT',
      major: 'Aerospace Engineering',
      reputation: 4.8,
      bio: 'Masters rank in Apex, love fast-paced action and team coordination. Looking for a consistent squad to grind ranked with.',
      gamingStyle: 'Competitive',
      genres: ['Battle Royale', 'FPS'],
      games: ['Apex Legends', 'Call of Duty: Warzone'],
      competitiveRank: 'Apex Legends: Masters',
      rankVerified: true,
      interests: ['Aviation', 'Sim Racing', 'Fitness'],
      tags: ['Competitive', 'Fast-Paced', 'Adrenaline'],
    },
    {
      id: 8,
      username: 'StrategyKing',
      age: 23,
      school: 'GT',
      major: 'Mathematics',
      reputation: 4.7,
      bio: 'Strategy game enthusiast, from RTS to turn-based. Love deep thinking and planning. Always looking for challenging opponents and teammates.',
      gamingStyle: 'Ranked',
      genres: ['Strategy', 'RTS', 'Turn-Based'],
      games: ['Age of Empires IV', 'Chess.com', 'Civilization VI'],
      competitiveRank: 'Chess.com: 1800 ELO',
      rankVerified: false,
      interests: ['Puzzles', 'Board Games', 'Research'],
      tags: ['Strategic', 'Patient', 'Thinker'],
    },
  ];

  const [viewedProfiles, setViewedProfiles] = useState(new Set());
  const allProfilesViewed = viewedProfiles.size >= profiles.length;

  const handleAccept = () => {
    const profile = profiles[currentProfile];
    console.log('Accepted:', profile.username);
    
    // Add to matches
    const newMatch = addMatch(profile);
    setMatchedUser(newMatch);
    setShowSuccessModal(true);
    
    // Mark as viewed
    setViewedProfiles(prev => new Set([...prev, currentProfile]));
    
    // Move to next profile after a delay
    setTimeout(() => {
      if (currentProfile < profiles.length - 1) {
        setCurrentProfile(currentProfile + 1);
      }
    }, 2000);
  };

  const handleReject = () => {
    console.log('Rejected:', profiles[currentProfile].username);
    // Mark as viewed
    setViewedProfiles(prev => new Set([...prev, currentProfile]));
    // Move to next profile
    if (currentProfile < profiles.length - 1) {
      setCurrentProfile(currentProfile + 1);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setMatchedUser(null);
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
    } else {
      Alert.alert('Error', 'Please provide a reason for reporting this review.');
    }
  };

  const profile = allProfilesViewed ? null : profiles[currentProfile];

  return (
    <SafeAreaView style={styles.container}>
      <MatchSuccessModal
        visible={showSuccessModal}
        onClose={handleCloseModal}
        matchedUser={matchedUser}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SwipeSync</Text>
        <Text style={styles.headerSubtitle}>Find your gaming squad</Text>
        {!allProfilesViewed && (
          <Text style={styles.profileCount}>
            {currentProfile + 1} / {profiles.length}
          </Text>
        )}
      </View>

      {allProfilesViewed ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🎮</Text>
          <Text style={styles.emptyTitle}>No More Matches</Text>
          <Text style={styles.emptyText}>
            You've viewed all available profiles!{'\n'}
            Check back later for new gamers.
          </Text>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Profile Card */}
            <View style={styles.profileCard}>
              {/* Profile Picture */}
              <View style={styles.profilePicture}>
                {profile.profilePicture ? (
                  <Image
                    source={profile.profilePicture}
                    style={styles.profilePictureImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.profileIcon}>
                    <View style={styles.iconHead} />
                    <View style={styles.iconBody} />
                  </View>
                )}
              </View>

          {/* User Information */}
          <View style={styles.userInfo}>
            <View style={styles.userHeader}>
              <Text style={styles.username}>{profile.username}</Text>
              <View style={styles.reputationBadge}>
                <Text style={styles.reputationText}>⭐ {profile.reputation}</Text>
              </View>
            </View>
            <Text style={styles.infoText}>Age: {profile.age}</Text>
            <Text style={styles.infoText}>School: {profile.school}</Text>
            <Text style={styles.infoText}>Major: {profile.major}</Text>
          </View>

          {/* Bio */}
          {profile.bio && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>About:</Text>
              <Text style={styles.bioText}>{profile.bio}</Text>
            </View>
          )}

          {/* Specific Games Played */}
          {profile.games && profile.games.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Games I Play:</Text>
              <View style={styles.gamesContainer}>
                {profile.games.map((game, index) => (
                  <View key={index} style={styles.gameBadge}>
                    <Text style={styles.gameBadgeText}>{game}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Competitive Rank */}
          {profile.competitiveRank && (
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Competitive Rank:</Text>
              <View style={styles.rankContainer}>
                <Text style={styles.rankText}>{profile.competitiveRank}</Text>
                {profile.rankVerified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedBadgeText}>✓ Verified</Text>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Gaming Style */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Gaming Style:</Text>
            <View style={styles.gamingStyleBadge}>
              <Text style={styles.gamingStyleText}>{profile.gamingStyle}</Text>
            </View>
          </View>

          {/* Genres */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Favorite Genres:</Text>
            <View style={styles.genresContainer}>
              {profile.genres.map((genre, index) => (
                <View key={index} style={styles.genreTag}>
                  <Text style={styles.genreText}>{genre}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Tags */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Tags:</Text>
            <View style={styles.tagsContainer}>
              {profile.tags.map((tag, index) => (
                <Text key={index} style={[styles.tag, styles.tagCompetitive]}>
                  {tag}
                </Text>
              ))}
            </View>
          </View>

          {/* Interests */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Interests:</Text>
            <View style={styles.interestsContainer}>
              {profile.interests.map((interest, index) => (
                <Text key={index} style={[styles.interest, styles.interestRockClimbing]}>
                  {interest}
                </Text>
              ))}
            </View>
          </View>

          {/* Reviews & Feedback */}
          {(() => {
            const profileReviews = getReviewsForUser(profile.username);
            return profileReviews.length > 0 ? (
              <View style={styles.section}>
                <View style={styles.reviewsHeader}>
                  <Text style={styles.sectionHeader}>Reviews & Feedback:</Text>
                  <Text style={styles.reviewCount}>
                    {profileReviews.length} {profileReviews.length === 1 ? 'review' : 'reviews'}
                  </Text>
                </View>
                <FlatList
                  data={profileReviews}
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
                        {review.overallExp && (
                          <View style={styles.reviewRating}>
                            <StarRating rating={getStarRating(review.overallExp)} />
                          </View>
                        )}
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
                        <Text style={styles.reportButtonText}>🚫 Report</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  contentContainerStyle={styles.reviewsListContent}
                />
              </View>
            ) : null;
          })()}
        </View>

            {/* Action Buttons */}
            <View style={[styles.actionButtons, { paddingBottom: Math.max(insets.bottom, 20) + 70 }]}>
              <TouchableOpacity
                style={[styles.actionButton, styles.rejectButton]}
                onPress={handleReject}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonText}>✕</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.acceptButton]}
                onPress={handleAccept}
                activeOpacity={0.8}
              >
                <Text style={styles.actionButtonText}>✓</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )}

      {/* Report Review Modal */}
      <Modal
        visible={showReportModal}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setShowReportModal(false);
          setReportReason('');
          setSelectedReviewId(null);
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Report Review</Text>
              <TouchableOpacity
                onPress={() => {
                  setShowReportModal(false);
                  setReportReason('');
                  setSelectedReviewId(null);
                }}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
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
                style={[styles.modalButton, styles.cancelModalButton]}
                onPress={() => {
                  setShowReportModal(false);
                  setReportReason('');
                  setSelectedReviewId(null);
                }}
              >
                <Text style={styles.cancelModalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitModalButton]}
                onPress={submitReport}
              >
                <Text style={styles.submitModalButtonText}>Submit Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GTColors.darkBg,
  },
  header: {
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: GTColors.gold,
  },
  headerTitle: {
    ...GTFontStyles.heading,
    fontSize: 28,
    color: GTColors.gold,
  },
  headerSubtitle: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.textMuted,
    marginTop: 5,
  },
  profileCount: {
    ...GTFontStyles.body,
    fontSize: 12,
    color: GTColors.gold,
    marginTop: 5,
    textAlign: 'right',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 20,
  },
  profileCard: {
    backgroundColor: GTColors.darkCard,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  profilePicture: {
    width: 120,
    height: 120,
    backgroundColor: GTColors.gold,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: GTColors.goldDark,
    overflow: 'hidden',
  },
  profilePictureImage: {
    width: '100%',
    height: '100%',
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
  userInfo: {
    marginBottom: 20,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  username: {
    ...GTFontStyles.heading,
    fontSize: 24,
    color: GTColors.textPrimary,
  },
  reputationBadge: {
    backgroundColor: GTColors.gold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  reputationText: {
    ...GTFontStyles.button,
    fontSize: 14,
    color: GTColors.darkBg,
  },
  infoText: {
    ...GTFontStyles.body,
    fontSize: 16,
    color: GTColors.textPrimary,
    marginBottom: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    ...GTFontStyles.heading,
    fontSize: 16,
    color: GTColors.textPrimary,
    marginBottom: 10,
  },
  gamingStyleBadge: {
    backgroundColor: GTColors.gold,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  gamingStyleText: {
    ...GTFontStyles.button,
    fontSize: 16,
    color: GTColors.darkBg,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  genreTag: {
    backgroundColor: GTColors.gold,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    margin: 5,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  genreText: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.darkBg,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  tag: {
    ...GTFontStyles.body,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 2,
    margin: 5,
  },
  tagCompetitive: {
    color: GTColors.gold,
    borderColor: GTColors.gold,
    backgroundColor: 'rgba(179, 163, 105, 0.1)',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  interest: {
    ...GTFontStyles.body,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 2,
    margin: 5,
  },
  interestRockClimbing: {
    color: GTColors.goldLight,
    borderColor: GTColors.goldLight,
    backgroundColor: 'rgba(212, 197, 137, 0.1)',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 30,
    backgroundColor: GTColors.darkBg,
  },
  actionButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    marginHorizontal: 20,
  },
  rejectButton: {
    backgroundColor: GTColors.navy,
    borderColor: GTColors.gold,
  },
  acceptButton: {
    backgroundColor: GTColors.gold,
    borderColor: GTColors.goldDark,
  },
  actionButtonText: {
    fontSize: 36,
    color: GTColors.white,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    ...GTFontStyles.heading,
    fontSize: 28,
    color: GTColors.gold,
    marginBottom: 15,
    textAlign: 'center',
  },
  emptyText: {
    ...GTFontStyles.body,
    fontSize: 16,
    color: GTColors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
  bioText: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.textPrimary,
    lineHeight: 20,
    padding: 12,
    backgroundColor: GTColors.darkBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GTColors.goldDark,
  },
  gamesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  gameBadge: {
    backgroundColor: GTColors.gold,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    margin: 5,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  gameBadgeText: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.darkBg,
    fontWeight: '600',
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GTColors.darkBg,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GTColors.goldDark,
  },
  rankText: {
    ...GTFontStyles.body,
    fontSize: 15,
    color: GTColors.textPrimary,
    fontWeight: '600',
    flex: 1,
  },
  verifiedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2E7D32',
    marginLeft: 10,
  },
  verifiedBadgeText: {
    ...GTFontStyles.body,
    fontSize: 11,
    color: GTColors.white,
    fontWeight: '600',
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
  reviewCard: {
    backgroundColor: GTColors.darkBg,
    borderRadius: 8,
    padding: 12,
    marginRight: 15,
    borderWidth: 1,
    borderColor: GTColors.goldDark,
    width: width - 80, // Full width minus padding
    minHeight: 180,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reviewerName: {
    ...GTFontStyles.heading,
    fontSize: 14,
    color: GTColors.gold,
  },
  reviewDate: {
    ...GTFontStyles.body,
    fontSize: 11,
    color: GTColors.textMuted,
    marginTop: 2,
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
    marginBottom: 8,
    marginHorizontal: -3,
  },
  reviewTag: {
    backgroundColor: GTColors.gold,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    margin: 3,
    borderWidth: 1,
    borderColor: GTColors.goldDark,
  },
  reviewTagText: {
    ...GTFontStyles.body,
    fontSize: 10,
    color: GTColors.darkBg,
  },
  reviewComment: {
    ...GTFontStyles.body,
    fontSize: 13,
    color: GTColors.textPrimary,
    lineHeight: 18,
    marginTop: 4,
  },
  reportedBadge: {
    ...GTFontStyles.body,
    fontSize: 11,
    color: '#ff9800',
    marginTop: 6,
  },
  reportButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: GTColors.darkCard,
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  reportButtonText: {
    ...GTFontStyles.body,
    fontSize: 11,
    color: '#ff4444',
    fontWeight: '600',
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: GTColors.gold,
    paddingBottom: 15,
  },
  modalTitle: {
    ...GTFontStyles.heading,
    fontSize: 22,
    color: GTColors.gold,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    color: GTColors.gold,
    fontWeight: 'bold',
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
    alignItems: 'center',
    borderWidth: 2,
  },
  cancelModalButton: {
    backgroundColor: GTColors.darkCard,
    borderColor: GTColors.goldDark,
  },
  submitModalButton: {
    backgroundColor: GTColors.gold,
    borderColor: GTColors.goldDark,
  },
  cancelModalButtonText: {
    ...GTFontStyles.button,
    fontSize: 14,
    color: GTColors.textPrimary,
  },
  submitModalButtonText: {
    ...GTFontStyles.button,
    fontSize: 14,
    color: GTColors.darkBg,
  },
});



