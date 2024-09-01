import mongoose, { Document, ObjectId } from "mongoose";
import { UserTokenModel } from "../../interfaces/User";

const { Schema } = mongoose;

const UserTokenSchema = new Schema<UserTokenModel>({
  userId: { 
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users" },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<UserTokenModel>("UserTokens", UserTokenSchema);