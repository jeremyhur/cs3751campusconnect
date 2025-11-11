import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useMatches } from '../context/MatchesContext';
import { GTColors, GTFonts, GTFontStyles } from '../theme';

export default function MatchesScreen({ navigation }) {
  const { matches } = useMatches();

  const renderMatchItem = ({ item }) => (
    <TouchableOpacity
      style={styles.matchItem}
      onPress={() => navigation.navigate('Chat', { user: item })}
      activeOpacity={0.7}
    >
      <View style={styles.profilePicture}>
        <View style={styles.profileIcon}>
          <View style={styles.iconHead} />
          <View style={styles.iconBody} />
        </View>
      </View>
      <View style={styles.matchInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.matchDate}>
          Matched {new Date(item.matchedAt).toLocaleDateString()}
        </Text>
        {item.genres && item.genres.length > 0 && (
          <View style={styles.genresContainer}>
            {item.genres.slice(0, 2).map((genre, index) => (
              <View key={index} style={styles.genreTag}>
                <Text style={styles.genreText}>{genre}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      <View style={styles.arrow}>
        <Text style={styles.arrowText}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Matches</Text>
        <Text style={styles.headerSubtitle}>
          {matches.length} {matches.length === 1 ? 'match' : 'matches'}
        </Text>
      </View>
      {matches.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>💬</Text>
          <Text style={styles.emptyTitle}>No matches yet</Text>
          <Text style={styles.emptyText}>
            Start swiping to find your gaming squad!
          </Text>
        </View>
      ) : (
        <FlatList
          data={matches}
          renderItem={renderMatchItem}
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
  matchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GTColors.darkCard,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  profilePicture: {
    width: 60,
    height: 60,
    backgroundColor: GTColors.gold,
    borderRadius: 30,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  profileIcon: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconHead: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 2,
    borderColor: GTColors.darkBg,
    marginBottom: 2,
  },
  iconBody: {
    width: 20,
    height: 10,
    borderWidth: 2,
    borderColor: GTColors.darkBg,
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  matchInfo: {
    flex: 1,
  },
  username: {
    ...GTFontStyles.heading,
    fontSize: 18,
    color: GTColors.textPrimary,
    marginBottom: 5,
  },
  matchDate: {
    ...GTFontStyles.body,
    fontSize: 12,
    color: GTColors.textMuted,
    marginBottom: 8,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreTag: {
    backgroundColor: GTColors.gold,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  genreText: {
    ...GTFontStyles.body,
    fontSize: 10,
    color: GTColors.darkBg,
  },
  arrow: {
    marginLeft: 10,
  },
  arrowText: {
    fontSize: 24,
    color: GTColors.gold,
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

