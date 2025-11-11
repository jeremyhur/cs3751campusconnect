import { Platform } from 'react-native';

// Georgia Tech Theme Colors
export const GTColors = {
  gold: '#B3A369',        // Tech Gold
  white: '#FFFFFF',       // White
  navy: '#003057',        // Navy Blue (secondary)
  darkBg: '#0a0a0a',      // Dark background
  darkCard: '#1a1a1a',    // Dark card background
  goldDark: '#8b7a4a',    // Darker gold for borders/hover
  goldLight: '#d4c589',   // Lighter gold for accents
  textPrimary: '#FFFFFF',
  textSecondary: '#B3A369',
  textMuted: '#888888',
};

// Gamer-style font configuration
// Using system fonts with bold weight and letter spacing for boxy, modern feel
export const GTFonts = {
  // Primary font - bold, boxy, gamer style
  primary: Platform.select({
    ios: 'Arial-BoldMT',      // Bold, boxy on iOS
    android: 'sans-serif-black', // Bold, boxy on Android
    default: 'Arial Black',
  }),
  // Alternative for when primary isn't available
  fallback: Platform.select({
    ios: 'HelveticaNeue-Bold',
    android: 'Roboto-Bold',
    default: 'Arial',
  }),
  // Regular weight for body text
  regular: Platform.select({
    ios: 'HelveticaNeue',
    android: 'Roboto',
    default: 'Arial',
  }),
};

// Font styles with gamer aesthetic
export const GTFontStyles = {
  title: {
    fontFamily: GTFonts.primary,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  heading: {
    fontFamily: GTFonts.primary,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  body: {
    fontFamily: GTFonts.regular,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  label: {
    fontFamily: GTFonts.regular,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  button: {
    fontFamily: GTFonts.primary,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
};

