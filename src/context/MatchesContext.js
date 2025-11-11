import React, { createContext, useState, useContext } from 'react';

const MatchesContext = createContext();

export const useMatches = () => {
  const context = useContext(MatchesContext);
  if (!context) {
    throw new Error('useMatches must be used within a MatchesProvider');
  }
  return context;
};

export const MatchesProvider = ({ children }) => {
  const [matches, setMatches] = useState([]);
  const [messages, setMessages] = useState({}); // { userId: [messages] }

  const addMatch = (profile) => {
    const newMatch = {
      ...profile,
      id: profile.id || Date.now(),
      matchedAt: new Date().toISOString(),
    };
    setMatches((prev) => {
      // Check if match already exists
      if (prev.find((m) => m.id === newMatch.id)) {
        return prev;
      }
      return [...prev, newMatch];
    });
    // Initialize empty messages array for this match
    if (!messages[newMatch.id]) {
      setMessages((prev) => ({
        ...prev,
        [newMatch.id]: [],
      }));
    }
    return newMatch;
  };

  const sendMessage = (userId, message) => {
    setMessages((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), {
        id: Date.now(),
        text: message,
        sentAt: new Date().toISOString(),
        sentBy: 'me',
      }],
    }));
  };

  const value = {
    matches,
    messages,
    addMatch,
    sendMessage,
  };

  return (
    <MatchesContext.Provider value={value}>
      {children}
    </MatchesContext.Provider>
  );
};

