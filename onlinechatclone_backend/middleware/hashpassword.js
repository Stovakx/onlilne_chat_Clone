import bcrypt from 'bcrypt';

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});
