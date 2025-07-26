import React, { useState } from "react";

export default function CustomerLookup() {
  const [customerId, setCustomerId] = useState("");
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");

  const fetchCustomer = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/customers/${customerId}`);
      if (!res.ok) {
        throw new Error("Customer not found");
      }
      const data = await res.json();
      setCustomer(data);
      setError("");
    } catch (err) {
      setError(err.message);
      setCustomer(null);
    }
  };

  return (
    <div>
      <h2>Customer Lookup</h2>
      <input
        type="text"
        placeholder="Enter Customer ID"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />
      <button onClick={fetchCustomer}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {customer && (
        <div style={{ marginTop: "20px" }}>
          <h3>Customer Info</h3>
          <p><strong>Name:</strong> {customer.customer_first_name} {customer.customer_last_name}</p>
          <p><strong>Email:</strong> {customer.customer_email}</p>
          <p><strong>Phone:</strong> {customer.customer_phone}</p>
          <p><strong>Address:</strong> {customer.customer_street_address}, {customer.customer_city}, {customer.customer_province} {customer.customer_postal_code}, {customer.customer_country}</p>
          <p><strong>Membership ID:</strong> {customer.membership_id}</p>
        </div>
      )}
    </div>
  );
}