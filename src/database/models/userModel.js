import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
const useSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String
  }
});
useSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } else {
    next();
  }
});
const User = mongoose.model("User", useSchema);

export default User;
