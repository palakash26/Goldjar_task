import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  passwordResetToken: String,
  passwordResetExpires: Date
}, { timestamps: true });
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});
userSchema.methods.comparePassword = async function(plain) {
  return bcrypt.compare(plain, this.password);
};
userSchema.methods.createPasswordResetToken = function() {
  const token = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto.createHash("sha256").update(token).digest("hex");

  this.passwordResetExpires = Date.now() + 60 * 60 * 1000;
  return token;
};

export const User = mongoose.model("User", userSchema);
