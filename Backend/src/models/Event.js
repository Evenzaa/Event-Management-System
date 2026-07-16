import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
    location: String,

    capacity: {
      type: Number,
      required: true,
    },

    ticketTypes: {
      general: {
        price: {
          type: Number,
          required: true,
        },
        availableSeats: {
          type: Number,
          required: true,
        },
      },

      vip: {
        price: {
          type: Number,
          required: true,
        },
        availableSeats: {
          type: Number,
          required: true,
        },
      },
    },

    discountPrice: {
      type: Number,
      default: null,
    },

    isLastMinute: {
      type: Boolean,
      default: false,
    },

    images: [String],
    category: String,
    tags: [String],

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "ongoing", "completed"],
      default: "pending",
    },

    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
