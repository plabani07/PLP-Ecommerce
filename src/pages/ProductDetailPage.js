import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetailPage.css'; // Import the CSS file

const ProductDetailPage = ({ cart, setCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (product) {
      setCart(prevCart => {
        const updatedCart = [...prevCart, product];
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Store cart in local storage
        return updatedCart;
      });
      navigate('/mybag'); // Navigate to the My Bag page without full page reload
    }
  };

  if (!product) {
    return <div>Loading...</div>; // You can render a loading indicator here
  }

  return (
    <div className="product-container">
      <div className="product-detail">
        <img className="product-image" src={product.thumbnail} alt={product.name} />
        <div className="product-details">
          <h2 className="product-name">{product.title}</h2>
          <p className="product-description">{product.description}</p>
          <h3 className="product-price">Price: ${product.price}</h3>
          <h4>Discount: {product.discountPercentage}%</h4>
          <h4>Rating: {product.rating}</h4>
          <h4>Stock: {product.stock}</h4>
          <h4>Brand: {product.brand}</h4>
          <h4>Category: {product.category}</h4>
          <button onClick={addToCart}>Add to Cart</button>
          <button className="add-to-cart-btn">Add to Favourites</button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;
