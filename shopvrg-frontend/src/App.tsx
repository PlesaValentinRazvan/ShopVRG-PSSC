import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useCartStore } from './store/cartStore';
import { useProductStore } from './store/productStore';
import { apiClient } from './api/client';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import './App.css';

function App() {
  const cartItems = useCartStore((state) => state.getTotalItems());
  const { setProducts, setLoading, setError } = useProductStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await apiClient.getActiveProducts();
        console.log('Loaded products:', products);
        if (!Array.isArray(products)) {
          setError('Invalid product data format received from server');
          return;
        }
        setProducts(products);
      } catch (error) {
        setError('Failed to load products');
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts, setLoading, setError]);

  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <div className="header-content">
            <Link to="/" className="logo">
              <h1>🖥️ ShopVRG</h1>
              <p>PC Components Store</p>
            </Link>
            <nav className="nav">
              <Link to="/">Shop</Link>
              <Link to="/cart" className="cart-link">
                Cart {cartItems > 0 && <span className="badge">{cartItems}</span>}
              </Link>
            </nav>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2026 ShopVRG - PC Components Store. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
