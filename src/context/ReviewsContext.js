import React, { createContext, useState, useContext } from 'react';

const ReviewsContext = createContext();

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};

export const ReviewsProvider = ({ children }) => {
  // Initialize with sample reviews for demo purposes
  const [reviews, setReviews] = useState([
    {
      id: '1',
      reviewedUserId: 'Gamer123',
      reviewerName: 'ProGamer99',
      overallExp: 'great',
      selectedTags: ['Friendly Player', 'Good Comms', 'Great Teammate'],
      comments: 'Really solid teammate! Great communication and always positive. Would definitely play with again.',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      reported: false,
    },
    {
      id: '2',
      reviewedUserId: 'Gamer123',
      reviewerName: 'ValorantPro',
      overallExp: 'good',
      selectedTags: ['Strong Skills', 'Helpful'],
      comments: 'Good aim and game sense. Helpful with callouts.',
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      reported: false,
    },
    {
      id: '3',
      reviewedUserId: 'ValorantPro',
      reviewerName: 'CS2Elite',
      overallExp: 'great',
      selectedTags: ['Strong Skills', 'Great Teammate', 'Good Comms'],
      comments: 'Incredible player! Immortal rank is well-deserved. Excellent IGL and clutch potential.',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      reported: false,
    },
    {
      id: '4',
      reviewedUserId: 'LeagueMaster',
      reviewerName: 'ProGamer99',
      overallExp: 'good',
      selectedTags: ['Team Player', 'Helpful'],
      comments: 'Great support player! Always there for the team and makes smart plays.',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      reported: false,
    },
    {
      id: '5',
      reviewedUserId: 'CS2Elite',
      reviewerName: 'ValorantPro',
      overallExp: 'great',
      selectedTags: ['Strong Skills', 'Great Teammate', 'Friendly Player'],
      comments: 'Global Elite for a reason! Amazing aim and game sense. Very friendly and patient with teammates.',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      reported: false,
    },
    {
      id: '6',
      reviewedUserId: 'ApexLegend',
      reviewerName: 'Gamer123',
      overallExp: 'good',
      selectedTags: ['Fast-Paced', 'Team Player'],
      comments: 'Masters rank shows! Great movement and positioning. Fun to play with.',
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      reported: false,
    },
  ]);
  const [reportedReviews, setReportedReviews] = useState([]);

  const addReview = (review) => {
    const newReview = {
      ...review,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      reported: false,
    };
    setReviews((prev) => [...prev, newReview]);
    return newReview;
  };

  const getReviewsForUser = (userId) => {
    return reviews.filter((review) => review.reviewedUserId === userId);
  };

  const reportReview = (reviewId, reason) => {
    const review = reviews.find((r) => r.id === reviewId);
    if (review) {
      setReportedReviews((prev) => [
        ...prev,
        {
          reviewId,
          reason,
          reportedAt: new Date().toISOString(),
        },
      ]);
      // Mark review as reported
      setReviews((prev) =>
        prev.map((r) => (r.id === reviewId ? { ...r, reported: true } : r))
      );
    }
  };

  const removeReview = (reviewId) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  const value = {
    reviews,
    reportedReviews,
    addReview,
    getReviewsForUser,
    reportReview,
    removeReview,
  };

  return (
    <ReviewsContext.Provider value={value}>
      {children}
    </ReviewsContext.Provider>
  );
};



