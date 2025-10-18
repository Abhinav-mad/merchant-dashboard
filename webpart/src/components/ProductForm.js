import React, { useEffect, useState } from 'react';
import api from '../api';
import '../styles/product.css';

export default function ProductForm({ product, onSaved, onClose }) {
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price ?? 0);
  const [category, setCategory] = useState(product?.category || '');
  const [stock, setStock] = useState(product?.stock ?? 0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(product?.name || '');
    setPrice(product?.price ?? 0);
    setCategory(product?.category || '');
    setStock(product?.stock ?? 0);
  }, [product]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (product?.id) {
        await api.put(`/products/${product.id}`, { name, price, category, stock });
      } else {
        await api.post('/products', { name, price, category, stock });
      }
      onSaved();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{product ? 'Edit product' : 'Add product'}</h3>
        <form onSubmit={submit}>
          <label>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} required />

          <label>Price</label>
          <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required />

          <label>Category</label>
          <input value={category} onChange={e => setCategory(e.target.value)} />

          <label>Stock</label>
          <input type="number" value={stock} onChange={e => setStock(e.target.value)} />

          <div className="modal-actions">
            <button type="button" className="secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
