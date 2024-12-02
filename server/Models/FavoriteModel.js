import mongoose from "mongoose";
import middlewares from "../middlewares/setListMiddleware.js";

const { setProcessField, setTotalEpisode } = middlewares;

const listSchema = mongoose.Schema(
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
    name: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    currentEpisode: {
      type: String,
    },
    process: {
      type: String,
      enum: ["Complete", "On-going"],
    },
    quality: {
      type: String,
    },
    language: {
      type: String,
    },
    year: {
      type: String,
    },
    listType: {
      type: String,
      required: true,
      enum: ["favoriteList", "watchList", "continueList"], // Add enum for clarity
    },
    totalUploadEpisodes: {
      type: Number,
      default: 1,
    },
    clickedEpisode: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to set the "process" field dynamically based on "current_episode"
listSchema.pre("validate", setProcessField);
listSchema.pre("validate", setTotalEpisode);
export default mongoose.model("List", listSchema);
