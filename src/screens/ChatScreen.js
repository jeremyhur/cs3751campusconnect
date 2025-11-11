import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useMatches } from '../context/MatchesContext';
import { GTColors, GTFonts, GTFontStyles } from '../theme';

export default function ChatScreen({ route, navigation }) {
  const { user } = route.params;
  const { messages, sendMessage } = useMatches();
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);
  const userMessages = messages[user.id] || [];

  useEffect(() => {
    navigation.setOptions({
      title: user.username,
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
    });
  }, [navigation, user]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (flatListRef.current && userMessages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [userMessages.length]);

  const handleSend = () => {
    if (inputText.trim()) {
      sendMessage(user.id, inputText.trim());
      setInputText('');
    }
  };

  const renderMessage = ({ item }) => {
    const isMe = item.sentBy === 'me';
    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.myMessageContainer : styles.theirMessageContainer,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isMe ? styles.myMessage : styles.theirMessage,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isMe ? styles.myMessageText : styles.theirMessageText,
            ]}
          >
            {item.text}
          </Text>
          <Text
            style={[
              styles.messageTime,
              isMe ? styles.myMessageTime : styles.theirMessageTime,
            ]}
          >
            {new Date(item.sentAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={userMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            placeholderTextColor={GTColors.textMuted}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!inputText.trim()}
            activeOpacity={0.7}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GTColors.darkBg,
  },
  keyboardView: {
    flex: 1,
  },
  messagesList: {
    padding: 15,
    paddingBottom: 10,
  },
  messageContainer: {
    marginBottom: 15,
  },
  myMessageContainer: {
    alignItems: 'flex-end',
  },
  theirMessageContainer: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
  },
  myMessage: {
    backgroundColor: GTColors.gold,
    borderColor: GTColors.goldDark,
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    backgroundColor: GTColors.darkCard,
    borderColor: GTColors.goldDark,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    ...GTFontStyles.body,
    fontSize: 16,
    marginBottom: 4,
  },
  myMessageText: {
    color: GTColors.darkBg,
  },
  theirMessageText: {
    color: GTColors.textPrimary,
  },
  messageTime: {
    ...GTFontStyles.body,
    fontSize: 10,
    alignSelf: 'flex-end',
  },
  myMessageTime: {
    color: GTColors.darkBg,
    opacity: 0.7,
  },
  theirMessageTime: {
    color: GTColors.textMuted,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: 2,
    borderTopColor: GTColors.goldDark,
    backgroundColor: GTColors.darkCard,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: GTColors.darkBg,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontFamily: GTFonts.regular,
    fontSize: 16,
    color: GTColors.textPrimary,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: GTColors.gold,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: GTColors.goldDark,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    ...GTFontStyles.button,
    fontSize: 16,
    color: GTColors.darkBg,
  },
});

