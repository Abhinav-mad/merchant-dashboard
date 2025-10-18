const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../data/store");

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN;

async function authenticate(email, password) {
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  const token = jwt.sign({ userId: user.userId, email: user.email }, SECRET, {
    expiresIn: EXPIRES_IN,
  });
  return { token, user: { userId: user.userId, email: user.email } };
}

module.exports = { authenticate };
