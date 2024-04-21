import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductListPage.css';

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false when data fetching is done
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = () => {
    // Perform search logic here, e.g., filter products based on searchTerm
    console.log('Search term:', searchTerm);
    // Update products state based on search results
    // For now, let's log the search term to the console
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id} className="product-item">
            <Link to={`/product/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} />
              <h4 className="product-name-header">{product.title}</h4>
              <p>{`Price: $${product.price}`}</p>
              <p>{`Rating: ${product.rating}`}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListPage;
