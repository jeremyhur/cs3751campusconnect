import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useEvents } from '../context/EventsContext';
import { GTColors, GTFonts, GTFontStyles } from '../theme';

export default function EventsScreen({ navigation }) {
  const { signedUpEvents, cancelEvent } = useEvents();

  const renderEventItem = ({ item }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventHeader}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => cancelEvent(item.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.eventDetails}>
        <Text style={styles.eventDetailText}>📍 {item.building}</Text>
        <Text style={styles.eventDetailText}>🕐 {item.time} - {item.date}</Text>
        <Text style={styles.eventDetailText}>👥 {item.players} players</Text>
        <Text style={styles.signedUpText}>
          Signed up: {new Date(item.signedUpAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Events</Text>
        <Text style={styles.headerSubtitle}>
          {signedUpEvents.length} {signedUpEvents.length === 1 ? 'event' : 'events'} signed up
        </Text>
      </View>
      {signedUpEvents.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📅</Text>
          <Text style={styles.emptyTitle}>No events yet</Text>
          <Text style={styles.emptyText}>
            Join events from the Spirit Map to see them here!
          </Text>
        </View>
      ) : (
        <FlatList
          data={signedUpEvents}
          renderItem={renderEventItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
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
    marginBottom: 5,
  },
  headerSubtitle: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.textMuted,
  },
  listContent: {
    padding: 15,
  },
  eventCard: {
    backgroundColor: GTColors.darkCard,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  eventTitle: {
    ...GTFontStyles.heading,
    fontSize: 20,
    color: GTColors.gold,
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: GTColors.navy,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  cancelButtonText: {
    ...GTFontStyles.body,
    fontSize: 12,
    color: GTColors.gold,
    fontWeight: '600',
  },
  eventDetails: {
    gap: 8,
  },
  eventDetailText: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.textPrimary,
  },
  signedUpText: {
    ...GTFontStyles.body,
    fontSize: 12,
    color: GTColors.textMuted,
    marginTop: 8,
    fontStyle: 'italic',
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
    fontSize: 24,
    color: GTColors.gold,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    ...GTFontStyles.body,
    fontSize: 16,
    color: GTColors.textMuted,
    textAlign: 'center',
  },
});



