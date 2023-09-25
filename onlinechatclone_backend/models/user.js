import mongoose from "mongoose";
import path from "path";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    Validator(value) {
      if (!Validator.isLength(value, { min: 8 })) {
        throw new Error("Password must have at least 8 letters.");
      }
      if (!/[A-Z]/.test(value)) {
        throw new Error("Password must have at least 1 capital letter.");
      }
      if (!/\d/.test(value)) {
        throw new Error("Password must have at least 1 digit.");
      }
    },
  },
  profilePhoto: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.pre("save", function (next) {
  if (this.profilePhoto && !this.profilePhoto.startsWith("http")) {
    // Pokud není URL, předpokládáme, že jde o cestu na serveru.
    this.profilePhoto = path.join("/images/profiles", this.profilePhoto);
  }
  next();
});

export default mongoose.model("User", userSchema);
