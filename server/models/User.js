import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    imgPath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: {
      type: String,
      default: "",
    },
    occupation: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const userModel = mongoose.model("User", UserSchema);
export default userModel;
