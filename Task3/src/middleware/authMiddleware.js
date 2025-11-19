import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const jwtSecret = process.env.JWT_SECRET || "dev_jwt_secret";

export async function protect(req, res, next) {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ message: "Not authorized" });

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "Not authorized" });

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Not authorized" });
  }
}
