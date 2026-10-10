import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  reciverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
  video: {
    type: String,
  },
});

const Message = mongoose.model("Message", messageSchema);

export default messageSchema;
