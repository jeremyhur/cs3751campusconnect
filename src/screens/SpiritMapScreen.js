import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Linking,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GTColors, GTFonts, GTFontStyles } from '../theme';
import { useEvents } from '../context/EventsContext';

const { width, height } = Dimensions.get('window');

export default function SpiritMapScreen() {
  const insets = useSafeAreaInsets();
  const [imageAspectRatio, setImageAspectRatio] = useState(1);
  const { signUpForEvent, isSignedUp, createdEvents } = useEvents();
  
  // Get image dimensions when image loads
  const handleImageLoad = (event) => {
    const { width: imageWidth, height: imageHeight } = event.nativeEvent.source;
    if (imageWidth && imageHeight) {
      setImageAspectRatio(imageHeight / imageWidth);
    }
  };
  
  // Sample gaming events with pixel coordinates for the map
  // These coordinates are approximate and should be adjusted based on actual map image
  const sampleEvents = [
    {
      id: 1,
      title: 'Valorant Tournament',
      location: { x: 45, y: 35 }, // Percentage positions on the map
      building: 'CULC',
      time: '6:00 PM',
      date: 'Today',
      players: 12,
      description: 'Join us for a competitive Valorant tournament! Single elimination bracket. Prizes for top 3 teams. Bring your A-game!',
    },
    {
      id: 2,
      title: 'League of Legends Night',
      location: { x: 60, y: 50 },
      building: 'Student Center',
      time: '8:00 PM',
      date: 'Tomorrow',
      players: 8,
      description: 'Casual League of Legends gaming night. All skill levels welcome. We\'ll form teams and play some fun matches!',
    },
    {
      id: 3,
      title: 'CS2 Practice Session',
      location: { x: 30, y: 60 },
      building: 'College of Computing',
      time: '4:00 PM',
      date: 'Today',
      players: 5,
      descriptionLink: 'https://forms.gle/example',
    },
  ];

  // Combine sample events with user-created events
  // Ensure created events have location coordinates (default to center if not set)
  const createdEventsWithLocation = createdEvents.map(event => ({
    ...event,
    location: event.location || { x: 50, y: 50 }, // Default to center if no location
  }));

  // Combine all events
  const gamingEvents = [...sampleEvents, ...createdEventsWithLocation];

  // Sample friends with pixel coordinates
  const friends = [
    {
      id: 1,
      name: 'Gamer123',
      location: { x: 50, y: 40 },
      status: 'online',
      building: 'CULC',
    },
    {
      id: 2,
      name: 'ProGamer99',
      location: { x: 65, y: 55 },
      status: 'gaming',
      building: 'Student Center',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Spirit Map</Text>
          <Text style={styles.headerSubtitle}>Gaming events & friends</Text>
        </View>

        {/* Map View */}
        <View style={styles.mapContainer}>
          <View style={[styles.mapWrapper, { height: (width - 40) * imageAspectRatio }]}>
            {/* Map Image - Update the require path if your image has a different name */}
            {/* Place your map image in /assets/ folder and update the filename below if needed */}
            <Image
              source={require('../../assets/gatech-map.png')}
              style={styles.mapImage(imageAspectRatio)}
              resizeMode="contain"
              onLoad={handleImageLoad}
              onError={(error) => {
                console.log('Map image failed to load:', error);
              }}
            />
            
            {/* Fallback placeholder - will show if image fails to load */}
            {/* To add your map: Place gatech-map.png (or any PNG) in /assets/ folder */}
            
            {/* Gaming Events Markers */}
            {gamingEvents.map((event) => (
              <View
                key={event.id}
                style={[
                  styles.eventMarkerAbsolute,
                  {
                    left: `${event.location.x}%`,
                    top: `${event.location.y}%`,
                  },
                ]}
              >
                <View style={styles.eventMarker}>
                  <Text style={styles.eventMarkerText}>🎮</Text>
                </View>
                <View style={styles.markerLabel}>
                  <Text style={styles.markerLabelText}>{event.title}</Text>
                </View>
              </View>
            ))}

            {/* Friends Markers */}
            {friends.map((friend) => (
              <View
                key={friend.id}
                style={[
                  styles.friendMarkerAbsolute,
                  {
                    left: `${friend.location.x}%`,
                    top: `${friend.location.y}%`,
                  },
                ]}
              >
                <View style={styles.friendMarker}>
                  <View style={[styles.friendDot, styles[`friend${friend.status}`]]} />
                </View>
                <View style={styles.markerLabel}>
                  <Text style={styles.markerLabelText}>{friend.name}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Events List */}
        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {gamingEvents.map((event) => {
              const signedUp = isSignedUp(event.id);
              return (
                <View key={event.id} style={styles.eventCard}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDetails}>📍 {event.building}</Text>
                  <Text style={styles.eventDetails}>🕐 {event.time} - {event.date}</Text>
                  <Text style={styles.eventDetails}>👥 {event.players} players</Text>
                  {event.description && (
                    <View style={styles.descriptionContainer}>
                      <Text style={styles.descriptionText}>{event.description}</Text>
                    </View>
                  )}
                  {event.descriptionLink && (
                    <TouchableOpacity
                      style={styles.linkButton}
                      onPress={async () => {
                        try {
                          const supported = await Linking.canOpenURL(event.descriptionLink);
                          if (supported) {
                            await Linking.openURL(event.descriptionLink);
                          } else {
                            Alert.alert('Error', `Cannot open this URL: ${event.descriptionLink}`);
                          }
                        } catch (error) {
                          Alert.alert('Error', 'Failed to open link. Please try again.');
                          console.error('Error opening link:', error);
                        }
                      }}
                    >
                      <Text style={styles.linkText}>📋 View Event Details</Text>
                    </TouchableOpacity>
                  )}
                  {!event.description && !event.descriptionLink && (
                    <Text style={styles.noDescriptionText}>No description provided</Text>
                  )}
                  <TouchableOpacity
                    style={[styles.joinButton, signedUp && styles.joinedButton]}
                    onPress={() => {
                      if (!signedUp) {
                        signUpForEvent(event);
                      }
                    }}
                    disabled={signedUp}
                  >
                    <Text style={styles.joinButtonText}>
                      {signedUp ? '✓ Signed Up' : 'Join Event'}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Friends List */}
        <View style={styles.friendsSection}>
          <Text style={styles.sectionTitle}>Friends Online</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {friends.map((friend) => (
              <View key={friend.id} style={styles.friendCard}>
                <View style={[styles.friendStatusDot, styles[`friend${friend.status}`]]} />
                <Text style={styles.friendName}>{friend.name}</Text>
                <Text style={styles.friendStatus}>{friend.status}</Text>
                <Text style={styles.friendLocation}>{friend.building}</Text>
              </View>
            ))}
          </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // Extra padding for tab bar + safe area
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
  mapContainer: {
    margin: 10,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: GTColors.goldDark,
    alignSelf: 'center',
  },
  mapWrapper: {
    position: 'relative',
    width: width - 40, // Account for margins
  },
  mapImage: (aspectRatio) => ({
    width: width - 40,
    height: (width - 40) * aspectRatio,
    resizeMode: 'contain',
  }),
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
  },
  mapPlaceholderText: {
    ...GTFontStyles.heading,
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  mapSubtext: {
    ...GTFontStyles.body,
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  mapSubtextSmall: {
    ...GTFontStyles.body,
    fontSize: 10,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  eventMarkerAbsolute: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  friendMarkerAbsolute: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  eventMarker: {
    backgroundColor: GTColors.gold,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: GTColors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  eventMarkerText: {
    fontSize: 20,
  },
  friendMarker: {
    alignItems: 'center',
  },
  friendDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  friendonline: {
    backgroundColor: GTColors.gold,
  },
  friendgaming: {
    backgroundColor: GTColors.goldLight,
  },
  markerLabel: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#fff',
  },
  markerLabelText: {
    ...GTFontStyles.body,
    fontSize: 10,
    color: GTColors.white,
  },
  eventsSection: {
    padding: 15,
    paddingTop: 10,
  },
  sectionTitle: {
    ...GTFontStyles.heading,
    fontSize: 18,
    color: GTColors.gold,
    marginBottom: 10,
  },
  horizontalScroll: {
    marginHorizontal: -15,
    paddingHorizontal: 15,
  },
  eventCard: {
    backgroundColor: GTColors.darkCard,
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
    width: width * 0.7,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  eventTitle: {
    ...GTFontStyles.heading,
    fontSize: 16,
    color: GTColors.gold,
    marginBottom: 8,
  },
  eventDetails: {
    ...GTFontStyles.body,
    fontSize: 12,
    color: GTColors.textMuted,
    marginBottom: 4,
  },
  joinButton: {
    backgroundColor: GTColors.gold,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  joinedButton: {
    backgroundColor: GTColors.goldDark,
    opacity: 0.7,
  },
  joinButtonText: {
    ...GTFontStyles.button,
    fontSize: 12,
    color: GTColors.darkBg,
  },
  descriptionContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: GTColors.darkBg,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: GTColors.goldDark,
  },
  descriptionText: {
    ...GTFontStyles.body,
    fontSize: 12,
    color: GTColors.textPrimary,
    lineHeight: 18,
  },
  linkButton: {
    marginTop: 8,
    marginBottom: 8,
    padding: 8,
    backgroundColor: GTColors.gold,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  linkText: {
    ...GTFontStyles.button,
    fontSize: 12,
    color: GTColors.darkBg,
  },
  noDescriptionText: {
    ...GTFontStyles.body,
    fontSize: 11,
    color: GTColors.textMuted,
    fontStyle: 'italic',
    marginTop: 5,
    marginBottom: 5,
  },
  friendsSection: {
    padding: 15,
    paddingTop: 0,
    paddingBottom: 20,
  },
  friendCard: {
    backgroundColor: GTColors.darkCard,
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    width: 100,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  friendStatusDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: '#fff',
  },
  friendName: {
    ...GTFontStyles.heading,
    fontSize: 12,
    color: GTColors.textPrimary,
    marginBottom: 4,
  },
  friendStatus: {
    ...GTFontStyles.body,
    fontSize: 10,
    color: GTColors.textMuted,
    textTransform: 'capitalize',
    marginBottom: 4,
  },
  friendLocation: {
    ...GTFontStyles.body,
    fontSize: 9,
    color: GTColors.textMuted,
    textAlign: 'center',
  },
});
