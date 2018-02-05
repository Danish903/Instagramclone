import mongoose, { Schema } from "mongoose";

const LikePhotoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  photo: [
    {
      type: Schema.Types.ObjectId,
      ref: "Photo"
    }
  ]
});

export default mongoose.model("PhotoLikes", LikePhotoSchema);
