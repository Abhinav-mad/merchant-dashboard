const express = require('express');
const router = express.Router();

const { createProduct, updateProduct, deleteProduct, getProductsByUser, statsForUser } = require('../services/productService');


router.get('/products', (req, res) => {
    const userId = req.user.userId;;
    const myProducts = getProductsByUser(userId);
    return res.status(200).json({ success: true, data: myProducts });
});


router.post('/products', (req, res) => {
    const userId = req.user.userId;
    const { name, price, category, stock } = req.body || {};
    const newProduct = createProduct({ userId, name, price, category, stock });
    return res.status(201).json({ success: true, data: newProduct });
});


router.put('/products/:id', (req, res) => {
    const userId = req.user.userId;
    const { name, price, category, stock } = req.body || {};

    try {
        const updatedProduct = updateProduct(userId, req.params.id, { name, price, category, stock });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        return res.status(200).json({ success: true, data: updatedProduct });
    } catch (err) {
        return res.status(err.status || 500).json({ success: false, error: err.message || 'Internal server error' });
    }
});

router.delete('/products/:id', (req, res) => {
    const userId = req.user.userId;

    try {
        const deleted = deleteProduct(userId, req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        return res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (err) {
        return res.status(err.status || 500).json({ success: false, error: err.message || 'Internal server error' });
    }
});

router.get('/stats', (req, res) => {
    const userId = req.user.userId;
    const stats = statsForUser(userId);
    return res.status(200).json({ success: true, data: stats });
});


module.exports = router;



