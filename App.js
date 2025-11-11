import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Platform, TouchableOpacity, Modal, Animated, Dimensions, ScrollView } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GTColors, GTFonts, GTFontStyles } from './src/theme';
import { MatchesProvider } from './src/context/MatchesContext';
import HomeScreen from './src/screens/HomeScreen';
import SwipeSyncScreen from './src/screens/SwipeSyncScreen';
import SpiritMapScreen from './src/screens/SpiritMapScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import ChatScreen from './src/screens/ChatScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const { width } = Dimensions.get('window');

function MainTabs({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);
  
  // Expose menu toggle to parent
  React.useEffect(() => {
    if (route.params?.openMenu) {
      setMenuVisible(true);
      navigation.setParams({ openMenu: false });
    }
  }, [route.params?.openMenu]);
  
  return (
    <>
      <SideMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        navigation={navigation}
      />
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: GTColors.darkCard,
            borderBottomWidth: 2,
            borderBottomColor: GTColors.gold,
          },
          headerTintColor: GTColors.gold,
          headerTitleStyle: {
            ...GTFontStyles.heading,
            fontSize: 20,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => setMenuVisible(true)}
              style={styles.menuButton}
            >
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
          ),
        tabBarStyle: {
          backgroundColor: GTColors.darkCard,
          borderTopWidth: 2,
          borderTopColor: GTColors.gold,
          height: 60 + (Platform.OS === 'ios' ? insets.bottom : 0),
          paddingBottom: Platform.OS === 'ios' ? insets.bottom + 8 : 8,
          paddingTop: 8,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarActiveTintColor: GTColors.gold,
        tabBarInactiveTintColor: GTColors.textMuted,
        tabBarLabelStyle: {
          fontFamily: GTFonts.regular,
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 0.5,
        },
      }}
    >
      <Tab.Screen 
        name="SwipeSync" 
        component={SwipeSyncScreen}
        options={{
          tabBarLabel: 'SwipeSync',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
              <View style={[styles.checkmark, { borderColor: focused ? GTColors.gold : GTColors.textMuted }]} />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="SpiritMap" 
        component={SpiritMapScreen}
        options={{
          tabBarLabel: 'Spirit Map',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.locationIcon, { borderColor: focused ? GTColors.gold : GTColors.textMuted }]} />
          ),
        }}
      />
      <Tab.Screen 
        name="PlayerCred" 
        component={ReviewScreen}
        options={{
          tabBarLabel: 'PlayerCred',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.bookIcon, { borderColor: focused ? GTColors.gold : GTColors.textMuted }]}>
              <View style={[styles.bookLine1, { borderColor: focused ? GTColors.gold : GTColors.textMuted }]} />
              <View style={[styles.bookLine2, { borderColor: focused ? GTColors.gold : GTColors.textMuted }]} />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.profileIcon, { borderColor: focused ? GTColors.gold : GTColors.textMuted }]}>
              <View style={styles.profileIconInner}>
                <View style={[styles.profileIconHead, { borderColor: focused ? GTColors.gold : GTColors.textMuted }]} />
                <View style={[styles.profileIconBody, { borderColor: focused ? GTColors.gold : GTColors.textMuted }]} />
              </View>
            </View>
          ),
        }}
      />
      </Tab.Navigator>
    </>
  );
}

function SideMenu({ visible, onClose, navigation }) {
  const slideAnim = React.useRef(new Animated.Value(-280)).current;
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -280,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleNavigate = (screen) => {
    onClose();
    setTimeout(() => {
      navigation.navigate(screen);
    }, 300);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.menuOverlay}>
        <TouchableOpacity
          style={styles.menuOverlayTouchable}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.menuContainer,
            {
              transform: [{ translateX: slideAnim }],
              paddingTop: insets.top,
            },
          ]}
        >
          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>Menu</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.menuContent} contentContainerStyle={styles.menuContentContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleNavigate('MainTabs')}
            >
              <Text style={styles.menuIcon}>🏠</Text>
              <Text style={styles.menuItemText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleNavigate('Matches')}
            >
              <Text style={styles.menuIcon}>💬</Text>
              <Text style={styles.menuItemText}>Your Matches</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <MatchesProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isLoggedIn ? (
              <Stack.Screen name="Home">
                {(props) => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
              </Stack.Screen>
            ) : (
              <>
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen
                  name="Matches"
                  component={MatchesScreen}
                  options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: GTColors.darkCard,
                      borderBottomWidth: 2,
                      borderBottomColor: GTColors.gold,
                    },
                    headerTintColor: GTColors.gold,
                    headerTitleStyle: {
                      ...GTFontStyles.heading,
                      fontSize: 20,
                    },
                  }}
                />
                <Stack.Screen
                  name="Chat"
                  component={ChatScreen}
                  options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: GTColors.darkCard,
                      borderBottomWidth: 2,
                      borderBottomColor: GTColors.gold,
                    },
                    headerTintColor: GTColors.gold,
                    headerTitleStyle: {
                      ...GTFontStyles.heading,
                      fontSize: 20,
                    },
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </MatchesProvider>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    marginLeft: 15,
    padding: 5,
  },
  menuIcon: {
    fontSize: 24,
    color: GTColors.gold,
    fontWeight: 'bold',
  },
  menuOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  menuOverlayTouchable: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    width: 280,
    height: '100%',
    backgroundColor: GTColors.darkCard,
    borderRightWidth: 2,
    borderRightColor: GTColors.gold,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: GTColors.gold,
    minHeight: 60,
  },
  menuTitle: {
    ...GTFontStyles.heading,
    fontSize: 22,
    color: GTColors.gold,
    flex: 1,
  },
  closeButton: {
    padding: 5,
    marginLeft: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: GTColors.gold,
    fontWeight: 'bold',
  },
  menuContent: {
    flex: 1,
  },
  menuContentContainer: {
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: GTColors.goldDark,
  },
  menuItemText: {
    ...GTFontStyles.body,
    fontSize: 18,
    color: GTColors.textPrimary,
    marginLeft: 15,
    flex: 1,
  },
  tabIcon: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: GTColors.textMuted,
  },
  tabIconActive: {
    borderColor: GTColors.gold,
    backgroundColor: 'rgba(179, 163, 105, 0.1)',
  },
  checkmark: {
    width: 8,
    height: 8,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '-45deg' }],
    marginTop: -2,
    borderColor: GTColors.textMuted,
  },
  bookIcon: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: GTColors.textMuted,
  },
  bookLine1: {
    width: 8,
    height: 0,
    borderTopWidth: 1,
    marginTop: -4,
    borderColor: GTColors.textMuted,
  },
  bookLine2: {
    width: 8,
    height: 0,
    borderTopWidth: 1,
    marginTop: 2,
    borderColor: GTColors.textMuted,
  },
  locationIcon: {
    width: 16,
    height: 20,
    borderWidth: 2,
    borderRadius: 8,
    borderBottomWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: 2,
    borderColor: GTColors.textMuted,
  },
  profileIcon: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: GTColors.textMuted,
  },
  profileIconInner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconHead: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: GTColors.textMuted,
    marginBottom: 1,
  },
  profileIconBody: {
    width: 10,
    height: 5,
    borderWidth: 1.5,
    borderColor: GTColors.textMuted,
    borderTopWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});
