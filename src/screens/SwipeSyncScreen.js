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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GTColors, GTFonts, GTFontStyles } from '../theme';
import { useMatches } from '../context/MatchesContext';
import MatchSuccessModal from '../components/MatchSuccessModal';

const { width } = Dimensions.get('window');

export default function SwipeSyncScreen() {
  const [currentProfile, setCurrentProfile] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [matchedUser, setMatchedUser] = useState(null);
  const { addMatch } = useMatches();
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
});



