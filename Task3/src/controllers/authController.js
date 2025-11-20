import Joi from "joi";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../models/userModel.js";
import { sendEmail } from "../utils/email.js";

const jwtSecret = process.env.JWT_SECRET || "dev_jwt_secret";
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "7d";

/* ---------- Validation Schemas ---------- */
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const resetSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required()
});

/* ---------- Helpers ---------- */
function signToken(userId) {
  return jwt.sign({ id: userId }, jwtSecret, { expiresIn: jwtExpiresIn });
}

/* ---------- Controllers ---------- */

// POST register
export async function register(req, res) {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const existing = await User.findOne({ email: value.email });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const user = new User({ email: value.email, password: value.password });
    await user.save();

    const token = signToken(user._id);
    res.status(201).json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// POST login
export async function login(req, res) {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const user = await User.findOne({ email: value.email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await user.comparePassword(value.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user._id);
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// POST forgot-password
export async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });
    if (!user) {
      // don't reveal whether email exists — respond OK
      return res.json({ message: "If that email exists, a reset link has been sent." });
    }

    const token = user.createPasswordResetToken(); // plain token returned
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.FRONTEND_RESET_URL || "http://localhost:3000/reset-password"}?token=${token}&email=${encodeURIComponent(user.email)}`;

    // Send email 
    try {
      await sendEmail({
        to: user.email,
        subject: "Password reset",
        text: `Reset your password using this link: ${resetUrl}`,
        html: `<p>Reset your password <a href="${resetUrl}">here</a></p>`
      });
    } catch (mailErr) {
      console.error("Mail error:", mailErr);
    }

    res.json({ message: "If that email exists, a reset link has been sent." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// POST reset-password
export async function resetPassword(req, res) {
  try {
    const { error, value } = resetSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const hashed = crypto.createHash("sha256").update(value.token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashed,
      passwordResetExpires: { $gt: Date.now() }
    });
    if (!user) return res.status(400).json({ message: "Token invalid or expired" });

    user.password = value.password; 
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    const token = signToken(user._id);
    res.json({ token, message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
