import React, { useState } from "react";

export default function CustomerLookup() {
  const [customerId, setCustomerId] = useState("");
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);

  const fetchCustomer = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/customers/${customerId}`);
      if (!res.ok) throw new Error("Customer not found");

      const data = await res.json();
      setCustomer(data);
      setError("");
      setEditMode(false); // ensure it's not in edit mode
    } catch (err) {
      setError(err.message);
      setCustomer(null);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/customers/${customer.customer_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });
      const data = await res.json();
      alert(data.message);
      setEditMode(false); // exit edit mode after update
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/customers/${customer.customer_id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data.message);
      setCustomer(null);
    } catch (err) {
      alert("Delete failed");
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

      {customer && !editMode && (
        <div style={{ marginTop: "20px" }}>
          <h3>Customer Info</h3>
          <p><strong>Name:</strong> {customer.customer_first_name} {customer.customer_last_name}</p>
          <p><strong>Email:</strong> {customer.customer_email}</p>
          <p><strong>Phone:</strong> {customer.customer_phone}</p>
          <p><strong>Address:</strong> {customer.customer_street_address}, {customer.customer_city}, {customer.customer_province} {customer.customer_postal_code}, {customer.customer_country}</p>
          <p><strong>Subscription:</strong> {customer.subscription}</p>
          <p><strong>Membership ID:</strong> {customer.membership_id}</p>

          <button onClick={() => setEditMode(true)} style={{ marginRight: "10px" }}>
            Update
          </button>
          <button onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>
            Delete
          </button>
        </div>
      )}

      {customer && editMode && (
        <div style={{ marginTop: "20px" }}>
          <h3>Edit Customer</h3>
          <p>
            <strong>First Name:</strong>{" "}
            <input
              value={customer.customer_first_name}
              onChange={(e) => setCustomer({ ...customer, customer_first_name: e.target.value })}
            />
          </p>
          <p>
            <strong>Last Name:</strong>{" "}
            <input
              value={customer.customer_last_name}
              onChange={(e) => setCustomer({ ...customer, customer_last_name: e.target.value })}
            />
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <input
              value={customer.customer_email}
              onChange={(e) => setCustomer({ ...customer, customer_email: e.target.value })}
            />
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <input
              value={customer.customer_phone || ""}
              onChange={(e) => setCustomer({ ...customer, customer_phone: e.target.value })}
            />
          </p>
          <p>
            <strong>Street Address:</strong>{" "}
            <input
              value={customer.customer_street_address}
              onChange={(e) => setCustomer({ ...customer, customer_street_address: e.target.value })}
            />
          </p>
          <p>
            <strong>City:</strong>{" "}
            <input
              value={customer.customer_city}
              onChange={(e) => setCustomer({ ...customer, customer_city: e.target.value })}
            />
          </p>
          <p>
            <strong>Province:</strong>{" "}
            <input
              value={customer.customer_province}
              onChange={(e) => setCustomer({ ...customer, customer_province: e.target.value })}
            />
          </p>
          <p>
            <strong>Postal Code:</strong>{" "}
            <input
              value={customer.customer_postal_code}
              onChange={(e) => setCustomer({ ...customer, customer_postal_code: e.target.value })}
            />
          </p>
          <p>
            <strong>Country:</strong>{" "}
            <input
              value={customer.customer_country}
              onChange={(e) => setCustomer({ ...customer, customer_country: e.target.value })}
            />
          </p>
          <p>
            <strong>Subscription (Yes/No):</strong>{" "}
            <input
              value={customer.subscription || ""}
              onChange={(e) => setCustomer({ ...customer, subscription: e.target.value })}
            />
          </p>
          <p>
            <strong>Membership ID:</strong>{" "}
            <input
              value={customer.membership_id || ""}
              onChange={(e) => setCustomer({ ...customer, membership_id: e.target.value })}
            />
          </p>

          <button onClick={handleUpdate} style={{ marginRight: "10px" }}>
            Save
          </button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}