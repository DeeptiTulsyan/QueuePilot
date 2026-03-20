import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    tokenNumber: {
      type: String,
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["WAITING", "NOW_SERVING", "COMPLETED", "CANCELLED"],
      default: "WAITING"
    }
  },
  { timestamps: true }
);

const Token = mongoose.model("Token", tokenSchema);

export default Token;