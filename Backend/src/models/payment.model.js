import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
{
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  paymentMethod: {
    type: String,
    enum: [
      "card",
      "wallet",
      "bank_transfer",
      "paypal"
    ],
    required: true
  },

  transactionId: {
    type: String
  },

  status: {
    type: String,
    enum: [
      "pending",
      "paid",
      "failed",
      "refunded"
    ],
    default: "pending"
  }

},
{
 timestamps:true
}
);


export default mongoose.model("Payment", paymentSchema);