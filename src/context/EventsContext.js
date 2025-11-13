import React, { createContext, useState, useContext } from 'react';

const EventsContext = createContext();

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};

export const EventsProvider = ({ children }) => {
  const [signedUpEvents, setSignedUpEvents] = useState([]);

  const signUpForEvent = (event) => {
    const newEvent = {
      ...event,
      id: event.id || Date.now(),
      signedUpAt: new Date().toISOString(),
    };
    setSignedUpEvents((prev) => {
      // Check if event already exists
      if (prev.find((e) => e.id === newEvent.id)) {
        return prev;
      }
      return [...prev, newEvent];
    });
    return newEvent;
  };

  const cancelEvent = (eventId) => {
    setSignedUpEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  const isSignedUp = (eventId) => {
    return signedUpEvents.some((e) => e.id === eventId);
  };

  const value = {
    signedUpEvents,
    signUpForEvent,
    cancelEvent,
    isSignedUp,
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
};


