import mongoose, { Schema } from "mongoose";

const PhotoSchema = new Schema(
  {
    image_url: String,
    caption: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    photoLikes: { type: Number, default: 0 },
    isLiked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Photo", PhotoSchema);
