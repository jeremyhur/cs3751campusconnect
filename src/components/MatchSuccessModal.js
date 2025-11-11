import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { GTColors, GTFonts, GTFontStyles } from '../theme';

export default function MatchSuccessModal({ visible, onClose, matchedUser }) {
  const [scaleAnim] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.content}>
            <Text style={styles.successText}>🎉</Text>
            <Text style={styles.title}>It's a Match!</Text>
            <Text style={styles.subtitle}>
              You and {matchedUser?.username || 'them'} have matched!
            </Text>
            <Text style={styles.description}>
              Start a conversation and plan your next gaming session!
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Awesome!</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
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
    borderWidth: 3,
    borderColor: GTColors.gold,
    overflow: 'hidden',
  },
  content: {
    padding: 30,
    alignItems: 'center',
  },
  successText: {
    fontSize: 64,
    marginBottom: 20,
  },
  title: {
    ...GTFontStyles.heading,
    fontSize: 32,
    color: GTColors.gold,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    ...GTFontStyles.body,
    fontSize: 18,
    color: GTColors.textPrimary,
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    ...GTFontStyles.body,
    fontSize: 14,
    color: GTColors.textMuted,
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    backgroundColor: GTColors.gold,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
    minWidth: 150,
  },
  buttonText: {
    ...GTFontStyles.button,
    fontSize: 18,
    color: GTColors.darkBg,
    textAlign: 'center',
  },
});

