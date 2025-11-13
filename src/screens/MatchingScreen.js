import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { GTColors, GTFonts, GTFontStyles } from '../theme';

export default function MatchingScreen() {
  const handleAccept = () => {
    console.log('Accepted');
    // Handle accept logic
  };

  const handleReject = () => {
    console.log('Rejected');
    // Handle reject logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Picture */}
        <View style={styles.profileSection}>
          <View style={styles.profilePicture}>
            <View style={styles.profileIcon}>
              <View style={styles.iconHead} />
              <View style={styles.iconBody} />
            </View>
          </View>

          {/* User Information */}
          <View style={styles.userInfo}>
            <Text style={styles.username}>Gamer123</Text>
            <Text style={styles.infoText}>Age: 20</Text>
            <Text style={styles.infoText}>School: GT</Text>
            <Text style={styles.infoText}>Major: CS</Text>
          </View>
        </View>

        {/* Tags Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Tags:</Text>
          <View style={styles.tagsContainer}>
            <Text style={[styles.tag, styles.tagCompetitive]}>Competitive</Text>
            <Text style={[styles.tag, styles.tagLateNights]}>Late Nights</Text>
            <Text style={[styles.tag, styles.tagFriendly]}>Friendly</Text>
          </View>
        </View>

        {/* Interests Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Interests:</Text>
          <View style={styles.interestsContainer}>
            <Text style={[styles.interest, styles.interestRockClimbing]}>Rock Climbing</Text>
            <Text style={[styles.interest, styles.interestCrochet]}>Crochet</Text>
            <Text style={[styles.interest, styles.interestGuitar]}>Guitar</Text>
          </View>
        </View>

        {/* Filter Match */}
        <View style={styles.matchSection}>
          <Text style={styles.matchLabel}>Filter Match: </Text>
          <Text style={styles.matchPercentage}>98 %</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
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
  profileSection: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'flex-start',
  },
  profilePicture: {
    width: 120,
    height: 120,
    backgroundColor: '#f5deb3',
    borderRadius: 12,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8b7355',
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
    borderColor: '#333',
    marginBottom: 5,
  },
  iconBody: {
    width: 40,
    height: 20,
    borderWidth: 3,
    borderColor: '#333',
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  userInfo: {
    flex: 1,
    paddingTop: 10,
  },
  username: {
    ...GTFontStyles.heading,
    fontSize: 24,
    color: GTColors.textPrimary,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  infoText: {
    ...GTFontStyles.body,
    fontSize: 16,
    color: GTColors.textPrimary,
    marginBottom: 4,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    ...GTFontStyles.heading,
    fontSize: 18,
    color: GTColors.textPrimary,
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  tag: {
    ...GTFontStyles.body,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 2,
    margin: 5,
  },
  tagCompetitive: {
    color: '#ff6b35',
    borderColor: '#ff6b35',
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
  },
  tagLateNights: {
    color: '#9b59b6',
    borderColor: '#9b59b6',
    backgroundColor: 'rgba(155, 89, 182, 0.1)',
  },
  tagFriendly: {
    color: '#fff',
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  interest: {
    ...GTFontStyles.body,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 2,
    margin: 5,
  },
  interestRockClimbing: {
    color: '#ff8c42',
    borderColor: '#ff8c42',
    backgroundColor: 'rgba(255, 140, 66, 0.1)',
  },
  interestCrochet: {
    color: '#2ecc71',
    borderColor: '#2ecc71',
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
  },
  interestGuitar: {
    color: '#fff',
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  matchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
    justifyContent: 'center',
  },
  matchLabel: {
    ...GTFontStyles.body,
    fontSize: 20,
    color: GTColors.textPrimary,
  },
  matchPercentage: {
    ...GTFontStyles.heading,
    fontSize: 20,
    color: '#2ecc71',
    textDecorationLine: 'underline',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
    backgroundColor: '#e74c3c',
  },
  acceptButton: {
    backgroundColor: '#90ee90',
  },
  actionButtonText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
});
