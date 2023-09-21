import { path } from "mongoose";

userSchema.pre('save', function (next) {
  if (this.profilePhoto && !this.profilePhoto.startsWith('http')) {
    // Pokud není URL, předpokládáme, že jde o cestu na serveru.
    this.profilePhoto = path.join('/images/profiles', this.profilePhoto);
  }
  next();
});
