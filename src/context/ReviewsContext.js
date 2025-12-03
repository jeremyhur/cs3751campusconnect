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
  const [reviews, setReviews] = useState([]);
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


