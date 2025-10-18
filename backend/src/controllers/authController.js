const express = require("express");
const router = express.Router();

const { authenticate } = require("../services/authService");

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  const auth = await authenticate(email, password);
  if (!auth)
    return res
      .status(401)
      .json({ success: false, error: "Invalid credentials" });
  return res.json({ success: true, token: auth.token, user: auth.user });
});

module.exports = router;
