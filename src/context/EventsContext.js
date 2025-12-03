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
  const [createdEvents, setCreatedEvents] = useState([]);

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

  const createEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      players: 0, // Start with 0 players, will increment as people join
      createdBy: 'current-user', // In a real app, this would be the user ID
    };
    setCreatedEvents((prev) => [...prev, newEvent]);
    return newEvent;
  };

  const updateEvent = (eventId, updates) => {
    setCreatedEvents((prev) =>
      prev.map((event) => (event.id === eventId ? { ...event, ...updates } : event))
    );
  };

  const deleteEvent = (eventId) => {
    setCreatedEvents((prev) => prev.filter((e) => e.id !== eventId));
    // Also remove from signed up events if user was signed up
    setSignedUpEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  const value = {
    signedUpEvents,
    createdEvents,
    signUpForEvent,
    cancelEvent,
    isSignedUp,
    createEvent,
    updateEvent,
    deleteEvent,
  };

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
};




