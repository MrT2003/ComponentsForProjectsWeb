export interface Comment {
    _id: string; // Comment ID
    userId: {
      _id: string; // User ID
      fullName: string; // User's full name
      avatar: string; // User's avatar URL
    };
    movieId: string; // Movie ID associated with the comment
    text: string; // Comment text
    createdAt: string; // Comment creation timestamp
    updatedAt: string; // Comment update timestamp
    duration: string; // Virtual field: duration since the comment was created
  }
  