import React, { useEffect, useState } from 'react';
import api from '../api';
import Stats from '../components/Stats';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';
import '../styles/dashboard.css';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  

  const userEmail = localStorage.getItem('userEmail');

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [pRes, sRes] = await Promise.all([api.get('/products'), api.get('/stats')]);
      setProducts(pRes?.data?.data || []);
      setStats(sRes?.data?.data || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleAdd = () => {
    setEditProduct(null);
    setShowForm(true);
  };

  const handleEdit = (prod) => {
    setEditProduct(prod);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await api.delete(`/products/${id}`);
    fetchAll();
  };

  const handleSaved = () => {
  setShowForm(false);
  setSuccessMessage('Product saved successfully!');
  fetchAll();

  // Clear message after 3 seconds
  setTimeout(() => setSuccessMessage(''), 3000);

  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    window.location.href = '/';
  };

  return (
    <div className="dashboard-root">
      <header className="topbar">
        <div className="brand">Mini Merchant Dashboard</div>
        <div className="profile">
          <span className="email">{userEmail}</span>
          <button className="link-btn" onClick={logout}>Sign out</button>
        </div>
      </header>

      <main className="container">
        <div className="panel overview">
          <div className="left">
            <h3>Overview</h3>
            <div className="cards">
              <div className="card">
                <div className="title">PRODUCTS</div>
                <div className="value">{stats?.totalProducts ?? '—'}</div>
              </div>
              <div className="card">
                <div className="title">TOTAL VALUE</div>
                <div className="value">${(stats?.totalValue ?? 0).toLocaleString()}</div>
              </div>
              <div className="card">
                <div className="title">CATEGORIES</div>
                <div className="value">{stats?.categoriesCount ?? '—'}</div>
              </div>
            </div>
          </div>
          <div className="right">
            <Stats stats={stats} />
          </div>
        </div>

        <div className="panel products">
          <div className="panel-header">
            <h3>Products</h3>
            <button onClick={handleAdd} className="primary">Add Product</button>
          </div>
  {successMessage && <div className="success-message">{successMessage}</div>}

          {loading ? <div>Loading...</div> :
            <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
          }
        </div>
      </main>

      {showForm && (
        <ProductForm
          product={editProduct}
          onClose={() => setShowForm(false)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
