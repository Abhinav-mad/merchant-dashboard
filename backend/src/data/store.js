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

  products.push({
    id: `p-${Date.now()}-1`,
    userId: "user-1",
    name: "T-Shirt",
    price: 25.0,
    category: "Clothing",
    stock: 50,
  });
  products.push({
    id: `p-${Date.now()}-2`,
    userId: "user-1",
    name: "Laptop",
    price: 899.0,
    category: "Electronics",
    stock: 15,
  });
})();

module.exports = { users, products };
