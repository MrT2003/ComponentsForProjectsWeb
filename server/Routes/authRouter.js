import express from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';

const router = express.Router();

// Google Login Route
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google Callback Route
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Successfully logged in with Google!", user: req.user, token });
  }
);

// Facebook Login Route
router.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));

// Facebook Callback Route
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    res.json({ message: "Successfully logged in with Facebook!", user: req.user });
  }
);

// Logout Route
router.get("/auth/logout", (req, res) => {
  req.logout(() => {
    res.json({ message: "Logged out successfully!" });
  });
});

export default router;
