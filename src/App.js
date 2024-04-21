import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import MyBagPage from './pages/MyBagPage';

function App() {
  const [cart, setCart] = useState([]);

  // Load cart from local storage on app initialization
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []); // Empty dependency array to run this effect only once

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/product/:id" element={<ProductDetailPage cart={cart} setCart={setCart} />} />
          <Route path="/mybag" element={<MyBagPage cart={cart} setCart={setCart} />} />
          <Route path="/" element={<ProductListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
