import mongoose from "mongoose";

// Define the schema for the category
const categorySchema = new mongoose.Schema(
    {
      _id: {
        type: Number, // Use _id as your custom auto-increment field
        required: true
      },
      name: {
        type: String,
        required: true
      },
      slug: {
        type: String,
        required: true,
        unique: true
      },
      image: {
        type: String,
        default: "https://via.placeholder.com/150"
      }
    }
  );

  const yearSchema = new mongoose.Schema(
    {
      _id: {
        type: Number, // Use _id as your custom auto-increment field
        required: true
      },
      year: {
        type: Number,
        required: true
      }
    }
  );

const countrySchema = new mongoose.Schema({
  _id: {
    type: Number, // Use _id as your custom auto-increment field
    required: true
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
});

export const Country = mongoose.model("Country", countrySchema);
export const Year = mongoose.model("Year", yearSchema);
export const Category = mongoose.model("Category", categorySchema);