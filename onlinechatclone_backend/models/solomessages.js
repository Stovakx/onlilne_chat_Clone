import mongoose from "mongoose";

const soloMessages = mongoose.Schema({
  message: String,
  name:String,

/*   name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }, */
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timestamp: String,
  received: Boolean,
});

export default mongoose.model("solomessages", soloMessages);

