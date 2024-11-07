import mongoose, { Document, ObjectId } from "mongoose";
import { IContentReview } from "../../interfaces/User";

const { Schema } = mongoose;

const ContentReviewSchema = new Schema<IContentReview>({
    musicId: { type: String, required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IContentReview>("ContentReview", ContentReviewSchema);