const { products } = require("../data/store");

function genId() {
  return `p-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

function getProductsByUser(userId) {
  return products.filter((p) => p.userId === userId);
}

function createProduct({ userId, name, price, category, stock }) {
  const product = {
    id: genId(),
    userId,
    name,
    price: Number(price),
    category: category || "Uncategorized",
    stock: Number(stock),
  };
  products.push(product);
  return p;
}

function updateProduct(userId, id, updates) {
  const prod = products.find((p) => p.id === id);
  if (!prod) return null;
  if (prod.userId !== userId)
    throw { status: 403, message: "You can't edit this product" };
  prod.name = updates.name ?? prod.name;
  prod.price = updates.price !== undefined ? Number(updates.price) : prod.price;
  prod.category = updates.category ?? prod.category;
  prod.stock = updates.stock !== undefined ? Number(updates.stock) : prod.stock;
  return prod;
}

function deleteProduct(userId, id) {
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  if (products[idx].userId !== userId)
    throw { status: 403, message: "You can't delete this product" };
  products.splice(idx, 1);
  return true;
}

function statsForUser(userId) {
  const userProducts = getProductsByUser(userId);
  const totalProducts = userProducts.length;
  const totalValue = userProducts.reduce(
    (acc, p) => acc + Number(p.price) * Number(p.stock || 0),
    0
  );
  const byCategory = {};
  userProducts.forEach((p) => {
    const cat = p.category || "Uncategorized";
    byCategory[cat] = (byCategory[cat] || 0) + 1;
  });
  return {
    totalProducts,
    totalValue,
    categoriesCount: Object.keys(byCategory).length,
    byCategory,
  };
}

module.exports = {
  getProductsByUser,
  createProduct,
  updateProduct,
  deleteProduct,
  statsForUser,
};
