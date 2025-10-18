import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';


export default function App() {
  return (
    <div className="app-root">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}
