import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyBagPage.css';

const MyBagPage = ({ cart, setCart }) => {
  const [quantityMap, setQuantityMap] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const GST_RATE = 0.18;
  const DELIVERY_CHARGE = 0;

  useEffect(() => {
    const newSubtotal = cart.reduce((acc, item) => {
      const itemQuantity = quantityMap[item.id] || 1;
      return acc + item.price * itemQuantity;
    }, 0);
    setSubtotal(newSubtotal);
  }, [cart, quantityMap]);

  const handleRemoveItem = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    const updatedCart = cart.filter((item) => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setQuantityMap((prevMap) => ({
      ...prevMap,
      [itemId]: newQuantity >= 1 ? newQuantity : 1,
    }));
  };

  const calculateGST = () => {
    return subtotal * GST_RATE;
  };

  const calculateTotal = () => {
    return subtotal + calculateGST() + DELIVERY_CHARGE;
  };

  return (
    <>
    <div className="my-bag-container">
      <div className="product-list-container">
        <h1>My Bag</h1>
        {cart.map(item => (
          <div key={item.id} className="product-item-container">
            <img src={item.thumbnail} alt={item.title} />
            <div className="product-details-container">
              <h3>{item.title}</h3>
              <p>Price: ₹ {item.price}</p>
              <div className="item-controls-container">
                <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, (quantityMap[item.id] || 1) - 1)}>-</button>
                <p className="quantity-text">Quantity: {quantityMap[item.id] || 1}</p>
                <button className="quantity-btn" onClick={() => handleQuantityChange(item.id, (quantityMap[item.id] || 1) + 1)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="pricing-details">
        <h2>Pricing Details</h2>
        <p>Subtotal: ₹ {subtotal.toFixed(2)}</p>
        <p>Discount: ₹ {discount.toFixed(2)}</p>
        <p>GST: ₹ {calculateGST().toFixed(2)}</p>
        <p>Delivery Charges: ₹ {DELIVERY_CHARGE.toFixed(2)}</p>
        <h3>Total: ₹ {calculateTotal().toFixed(2)}</h3>
      </div>
    </div>
    <div className="checkout-buttons-container">
        <Link to="/" className="btn btn-secondary">Continue Shopping</Link>
        <button className="btn btn-primary">Checkout</button>
      </div>
    </>
  );
}

export default MyBagPage;
