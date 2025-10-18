import React from 'react';
import '../styles/product.css';

export default function ProductList({ products, onEdit, onDelete }) {
  return (
    <table className="products-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Stock</th>
          <th style={{ width: 120 }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products?.length === 0 && (
          <tr><td colSpan="5">No products yet</td></tr>
        )}
        {products?.map(p => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>${Number(p.price).toFixed(2)}</td>
            <td>{p.category}</td>
            <td>{p.stock}</td>
            <td>
              <button className="small" onClick={() => onEdit(p)}>Edit</button>
              <button className="small danger" onClick={() => onDelete(p.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
