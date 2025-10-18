const bcrypt = require("bcryptjs");

// seeded users & products
const users = [];
const products = [];

// Seed a default user
(async () => {
  const hash = await bcrypt.hash("password123", 10);
  users.push({
    userId: "user-1",
    email: "admin@test.com",
    passwordHash: hash,
  });
})();

module.exports = { users };
