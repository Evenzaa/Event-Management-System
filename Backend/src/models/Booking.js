import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    tickets: [
      {
        ticketType: {
          type: String,
          enum: ["general", "vip"],
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        price: {
          type: Number,
          required: true,
        },

        subtotal: {
          type: Number,
          required: true,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    couponCode: {
      type: String,
      default: null,
    },

    paymentMethod: {
  type: String,
  enum: [
    "card",
    "wallet",
    "bank_transfer",
    "paypal"
  ],
  default: "card",
},

paymentStatus: {
  type: String,
  enum: [
 "pending",
   "paid",
   "failed",
   "refunded"
  ],
  default: "pending",
},

    ticketNumber: {
      type: String,
    },

    qrCode: {
      type: String,
    },

    status: {
      type: String,
      enum: ["confirmed", "cancelled","completed"],
      default: "confirmed",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
