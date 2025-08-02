import React, { useState } from 'react';

export default function Order() {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState('');

  const fetchOrder = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/orders/${orderId}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Order not found');
      }

      const data = await res.json();
      setOrderData(data);
      setError('');
    } catch (err) {
      setOrderData(null);
      setError(err.message);
    }
  };

  const calculateTotal = () => {
    if (!orderData || !orderData.items) return 0;
    return orderData.items.reduce((sum, item) => sum + item.quantity * item.paid_each, 0);
  };

  return (
    <div className="order-page">
      <h2>View Order Details</h2>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button onClick={fetchOrder}>Fetch Order</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {orderData && (
        <div className="order-details">
          <h3>Order Info</h3>
          <p><strong>Order ID:</strong> {orderData.order.order_id}</p>
          <p><strong>Customer ID:</strong> {orderData.order.customer_id}</p>
          <p><strong>Order Date:</strong> {orderData.order.order_date}</p>
          <p><strong>Ship Date:</strong> {orderData.order.ship_date}</p>
          <p><strong>Status:</strong> {orderData.order.order_status}</p>

          <h3>Items</h3>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {orderData.items.map(item => (
              <li key={item.item_id}>
                Product ID: {item.product_id}, Quantity: {item.quantity}, Paid Each: ${item.paid_each.toFixed(2)}
              </li>
            ))}
          </ul>

          <h3>Total Amount: ${calculateTotal().toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
}