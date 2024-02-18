import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      maxLength: [200, "Product name cannot exceed 200 characters"],
    },
    price: {
      type: Number,
      required: [true, "Pleae enter product price"],
      maxLength: [5, "Product price cannot exceed 5 digits"],
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please enter product category"],
      enum: {
        value: [
          "T-Shirts",
          "Short Sleeve",
          "Long Sleeve",
          "Pants",
          "Hats",
          "Misc.",
        ],
        message: "Please select correct category",
      },
    },
    seller: {
      type: String,
      required: [true, "Please enter product seller"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.objectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        rating: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.objectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
