import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useEvents } from '../context/EventsContext';
import { GTColors, GTFonts, GTFontStyles } from '../theme';

export default function EventsScreen({ navigation }) {
  const { signedUpEvents, createdEvents, cancelEvent, createEvent, deleteEvent } = useEvents();
  const [activeTab, setActiveTab] = useState('joined'); // 'joined' or 'created'
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    building: '',
    time: '',
    date: '',
    description: '',
    descriptionLink: '',
    location: { x: 50, y: 50 }, // Default location on map
  });

  const handleUnjoin = (eventId) => {
    Alert.alert(
      'Unjoin Event',
      'Are you sure you want to unjoin this event?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Unjoin',
          style: 'destructive',
          onPress: () => cancelEvent(eventId),
        },
      ]
    );
  };

  const handleDeleteEvent = (eventId) => {
    Alert.alert(
      'Delete Event',
      'Are you sure you want to delete this event? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteEvent(eventId),
        },
      ]
    );
  };

  const handleCreateEvent = () => {
    if (!eventForm.title.trim() || !eventForm.building.trim() || !eventForm.time.trim() || !eventForm.date.trim()) {
      Alert.alert('Error', 'Please fill in all required fields (Title, Building, Time, Date).');
      return;
    }

    if (!eventForm.description.trim() && !eventForm.descriptionLink.trim()) {
      Alert.alert('Error', 'Please provide either a description or a link to event details.');
      return;
    }

    createEvent(eventForm);
    setShowCreateModal(false);
    setEventForm({
      title: '',
      building: '',
      time: '',
      date: '',
      description: '',
      descriptionLink: '',
      location: { x: 50, y: 50 },
    });
    Alert.alert('Success', 'Event created successfully!');
  };

  const renderJoinedEventItem = ({ item }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventHeader}>
        <Text style={styles.eventTitle}>{item.title}</Text>
      </View>
      <View style={styles.eventDetails}>
        <Text style={styles.eventDetailText}>📍 {item.building}</Text>
        <Text style={styles.eventDetailText}>🕐 {item.time} - {item.date}</Text>
        <Text style={styles.eventDetailText}>👥 {item.players} players</Text>
        {item.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>Description:</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>
        )}
        {item.descriptionLink && (
          <TouchableOpacity
            style={styles.linkButton}
            onPress={async () => {
              try {
                const supported = await Linking.canOpenURL(item.descriptionLink);
                if (supported) {
                  await Linking.openURL(item.descriptionLink);
                } else {
                  Alert.alert('Error', `Cannot open this URL: ${item.descriptionLink}`);
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
        <Text style={styles.signedUpText}>
          Signed up: {new Date(item.signedUpAt).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.unjoinButton}
        onPress={() => handleUnjoin(item.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.unjoinButtonText}>Unjoin Event</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCreatedEventItem = ({ item }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventHeader}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.createdBadge}>
          <Text style={styles.createdBadgeText}>Created by You</Text>
        </View>
      </View>
      <View style={styles.eventDetails}>
        <Text style={styles.eventDetailText}>📍 {item.building}</Text>
        <Text style={styles.eventDetailText}>🕐 {item.time} - {item.date}</Text>
        <Text style={styles.eventDetailText}>👥 {item.players} players</Text>
        {item.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionLabel}>Description:</Text>
            <Text style={styles.descriptionText}>{item.description}</Text>
          </View>
        )}
        {item.descriptionLink && (
          <TouchableOpacity
            style={styles.linkButton}
            onPress={async () => {
              try {
                const supported = await Linking.canOpenURL(item.descriptionLink);
                if (supported) {
                  await Linking.openURL(item.descriptionLink);
                } else {
                  Alert.alert('Error', `Cannot open this URL: ${item.descriptionLink}`);
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
        <Text style={styles.signedUpText}>
          Created: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteEvent(item.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteButtonText}>Delete Event</Text>
      </TouchableOpacity>
    </View>
  );

  const currentEvents = activeTab === 'joined' ? signedUpEvents : createdEvents;
  const renderItem = activeTab === 'joined' ? renderJoinedEventItem : renderCreatedEventItem;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Events</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'joined' && styles.tabActive]}
            onPress={() => setActiveTab('joined')}
          >
            <Text style={[styles.tabText, activeTab === 'joined' && styles.tabTextActive]}>
              Joined ({signedUpEvents.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'created' && styles.tabActive]}
            onPress={() => setActiveTab('created')}
          >
            <Text style={[styles.tabText, activeTab === 'created' && styles.tabTextActive]}>
              Created ({createdEvents.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === 'created' && (
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Text style={styles.createButtonText}>+ Create New Event</Text>
        </TouchableOpacity>
      )}

      {currentEvents.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📅</Text>
          <Text style={styles.emptyTitle}>
            {activeTab === 'joined' ? 'No events yet' : 'No events created'}
          </Text>
          <Text style={styles.emptyText}>
            {activeTab === 'joined'
              ? 'Join events from the Spirit Map to see them here!'
              : 'Create your first event to get started!'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={currentEvents}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Create Event Modal */}
      <Modal
        visible={showCreateModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Create New Event</Text>
                <TouchableOpacity
                  onPress={() => setShowCreateModal(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.formLabel}>Event Title <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.formInput}
                value={eventForm.title}
                onChangeText={(text) => setEventForm({ ...eventForm, title: text })}
                placeholder="e.g., Valorant Tournament"
                placeholderTextColor={GTColors.textMuted}
              />

              <Text style={styles.formLabel}>Building <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.formInput}
                value={eventForm.building}
                onChangeText={(text) => setEventForm({ ...eventForm, building: text })}
                placeholder="e.g., CULC, Student Center"
                placeholderTextColor={GTColors.textMuted}
              />

              <Text style={styles.formLabel}>Time <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.formInput}
                value={eventForm.time}
                onChangeText={(text) => setEventForm({ ...eventForm, time: text })}
                placeholder="e.g., 6:00 PM"
                placeholderTextColor={GTColors.textMuted}
              />

              <Text style={styles.formLabel}>Date <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.formInput}
                value={eventForm.date}
                onChangeText={(text) => setEventForm({ ...eventForm, date: text })}
                placeholder="e.g., Today, Tomorrow, Dec 15"
                placeholderTextColor={GTColors.textMuted}
              />

              <Text style={styles.formLabel}>
                Description <Text style={styles.required}>*</Text> (or provide link below)
              </Text>
              <TextInput
                style={[styles.formInput, styles.textArea]}
                value={eventForm.description}
                onChangeText={(text) => setEventForm({ ...eventForm, description: text })}
                placeholder="Describe your event..."
                placeholderTextColor={GTColors.textMuted}
                multiline
                numberOfLines={4}
              />

              <Text style={styles.formLabel}>Or Link to Event Details</Text>
              <TextInput
                style={styles.formInput}
                value={eventForm.descriptionLink}
                onChangeText={(text) => setEventForm({ ...eventForm, descriptionLink: text })}
                placeholder="https://forms.gle/..."
                placeholderTextColor={GTColors.textMuted}
                keyboardType="url"
                autoCapitalize="none"
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelModalButton]}
                  onPress={() => setShowCreateModal(false)}
                >
                  <Text style={styles.cancelModalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.submitModalButton]}
                  onPress={handleCreateEvent}
                >
                  <Text style={styles.submitModalButtonText}>Create Event</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
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
    marginBottom: 15,
  },
  eventTitle: {
    ...GTFontStyles.heading,
    fontSize: 20,
    color: GTColors.gold,
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
  descriptionContainer: {
    marginTop: 12,
    marginBottom: 8,
    padding: 12,
    backgroundColor: GTColors.darkBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GTColors.goldDark,
  },
  descriptionLabel: {
    ...GTFontStyles.heading,
    fontSize: 12,
    color: GTColors.gold,
    marginBottom: 6,
  },
  descriptionText: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.textPrimary,
    lineHeight: 20,
  },
  linkButton: {
    marginTop: 8,
    padding: 10,
    backgroundColor: GTColors.gold,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  linkText: {
    ...GTFontStyles.button,
    fontSize: 14,
    color: GTColors.darkBg,
  },
  unjoinButton: {
    backgroundColor: GTColors.navy,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  unjoinButtonText: {
    ...GTFontStyles.button,
    fontSize: 16,
    color: GTColors.gold,
    fontWeight: '600',
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
  tabContainer: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: GTColors.darkCard,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: GTColors.gold,
    borderColor: GTColors.goldDark,
  },
  tabText: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.textPrimary,
  },
  tabTextActive: {
    ...GTFontStyles.button,
    color: GTColors.darkBg,
    fontWeight: '600',
  },
  createButton: {
    backgroundColor: GTColors.gold,
    margin: 15,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  createButtonText: {
    ...GTFontStyles.button,
    fontSize: 16,
    color: GTColors.darkBg,
  },
  createdBadge: {
    backgroundColor: GTColors.gold,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: GTColors.goldDark,
  },
  createdBadgeText: {
    ...GTFontStyles.body,
    fontSize: 10,
    color: GTColors.darkBg,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#b71c1c',
  },
  deleteButtonText: {
    ...GTFontStyles.button,
    fontSize: 16,
    color: GTColors.white,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: GTColors.darkCard,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    borderWidth: 3,
    borderColor: GTColors.gold,
    borderBottomWidth: 0,
  },
  modalContent: {
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: GTColors.gold,
    paddingBottom: 15,
  },
  modalTitle: {
    ...GTFontStyles.heading,
    fontSize: 24,
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
  formLabel: {
    ...GTFontStyles.label,
    fontSize: 14,
    color: GTColors.textPrimary,
    marginTop: 15,
    marginBottom: 8,
  },
  required: {
    color: '#ff4444',
  },
  formInput: {
    backgroundColor: GTColors.darkBg,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
    borderRadius: 8,
    padding: 12,
    fontFamily: GTFonts.regular,
    fontSize: 14,
    color: GTColors.textPrimary,
    marginBottom: 5,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 15,
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
    fontSize: 16,
    color: GTColors.textPrimary,
  },
  submitModalButtonText: {
    ...GTFontStyles.button,
    fontSize: 16,
    color: GTColors.darkBg,
  },
});





