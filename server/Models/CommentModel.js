import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Add a virtual field for "duration"
commentSchema.virtual("duration").get(function () {
  const createdAt = this.createdAt; // Access the "createdAt" field from timestamps
  const today = new Date(); // Current date
  const diffInDays = Math.floor((today - createdAt ) / (1000 * 60 * 60 * 24) + 1); // Difference in days

  if (diffInDays < 7) {
    return `${diffInDays} days`;
  } else {
    const weeks = Math.ceil(diffInDays / 7);
    return `${weeks} weeks`;
  }
});

// Enable virtuals in JSON output
commentSchema.set("toJSON", { virtuals: true });
commentSchema.set("toObject", { virtuals: true });

// Export the model
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
