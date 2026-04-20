import express from "express";
import passport from "passport";

const router = express.Router();
const FRONTEND_URL = process.env.FRONTEND_URL;

// Redirect to Google for login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${FRONTEND_URL}/login`, // redirect frontend on failure
  }),
  (req, res) => {
    // Successful login → redirect to frontend profile
    res.redirect(`${FRONTEND_URL}/profile`);
  },
);
router.get("/me", (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ user: null });
  }

  res.json({ user: req.user });
});

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }

    // destroy session completely
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.sendStatus(200);
    });
  });
});

export default router;
