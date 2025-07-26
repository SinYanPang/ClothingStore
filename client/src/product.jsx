import React, { useEffect, useState } from 'react'; 
import './product.css';

export default function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend API
    fetch('http://localhost:3000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const handleAddToCart = (productName) => {
    alert(`${productName} added to cart`);
    // Optional: add to cart logic goes here
  };

  return (
    <div className="product-page">
      <h2 className="product-title">Our Featured Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.product_id}>
            <div className="product-image">
              <img
                src={`/images/${product.product_name.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                alt={product.product_name}
              />
            </div>
            <div className="product-info">
              <h3>{product.product_name}</h3>
              <p>Color: {product.product_color}</p>
              <p>Size: {product.product_size}</p>
              <p className="price">${product.product_price.toFixed(2)}</p>
              <button
                className="buy-button"
                onClick={() => handleAddToCart(product.product_name)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}