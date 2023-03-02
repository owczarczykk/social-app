import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    imgPath: {
      type: String,
    },
    userImgPath: {
      type: String,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const postModel = mongoose.model("Post", PostSchema);
export default postModel;
