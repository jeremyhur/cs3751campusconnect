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

// Modern San Francisco font configuration
// Using system fonts for a clean, modern iOS feel
export const GTFonts = {
  // Primary font - San Francisco on iOS, Roboto on Android
  primary: Platform.select({
    ios: 'System',           // San Francisco on iOS
    android: 'Roboto',       // Modern Roboto on Android
    default: 'System',
  }),
  // Display font for large titles
  display: Platform.select({
    ios: 'System',           // SF Pro Display on iOS
    android: 'Roboto',       // Roboto on Android
    default: 'System',
  }),
  // Regular weight for body text
  regular: Platform.select({
    ios: 'System',           // San Francisco on iOS
    android: 'Roboto',       // Roboto on Android
    default: 'System',
  }),
};

// Modern font styles with refined typography
export const GTFontStyles = {
  title: {
    fontFamily: GTFonts.display,
    fontWeight: '700',       // Bold
    letterSpacing: -0.5,     // Tighter, more modern spacing
  },
  heading: {
    fontFamily: GTFonts.primary,
    fontWeight: '600',       // Semibold
    letterSpacing: -0.3,     // Tighter spacing
  },
  body: {
    fontFamily: GTFonts.regular,
    fontWeight: '400',       // Regular weight
    letterSpacing: 0,        // Natural spacing
  },
  label: {
    fontFamily: GTFonts.regular,
    fontWeight: '500',       // Medium weight
    letterSpacing: 0,        // Natural spacing
  },
  button: {
    fontFamily: GTFonts.primary,
    fontWeight: '600',       // Semibold
    letterSpacing: 0,        // Natural spacing
  },
};

