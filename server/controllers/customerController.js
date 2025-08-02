import oracledb from "oracledb";
import config from "./../../config/config.js";

// Get a customer by ID
export const getCustomerById = async (req, res) => {
  const customerId = req.params.customerId;

  try {
    const connection = await oracledb.getConnection(config.db);

    const result = await connection.execute(
      `SELECT * FROM CUSTOMERS WHERE customer_id = :id`,
      [customerId]
    );

    await connection.close();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const [row] = result.rows;
    const customer = {
      customer_id: row[0],
      customer_first_name: row[1],
      customer_last_name: row[2],
      customer_email: row[3],
      customer_phone: row[4],
      customer_street_address: row[5],
      customer_city: row[6],
      customer_province: row[7],
      customer_postal_code: row[8],
      customer_country: row[9],
      subscription: row[10],
      membership_id: row[11],
    };

    res.json(customer);
  } catch (err) {
    console.error("Error fetching customer:", err.message || err);
    res.status(500).json({ message: "Error fetching customer", error: err.message || err });
  }
};

// Update a customer by ID
export const updateCustomer = async (req, res) => {
  const customerId = req.params.customerId;

  try {
    const connection = await oracledb.getConnection(config.db);

    // Get existing customer first
    const existingResult = await connection.execute(
      `SELECT * FROM CUSTOMERS WHERE customer_id = :id`,
      [customerId]
    );

    if (existingResult.rows.length === 0) {
      await connection.close();
      return res.status(404).json({ message: "Customer not found" });
    }

    const [row] = existingResult.rows;
    const existingCustomer = {
      customer_first_name: row[1],
      customer_last_name: row[2],
      customer_email: row[3],
      customer_phone: row[4],
      customer_street_address: row[5],
      customer_city: row[6],
      customer_province: row[7],
      customer_postal_code: row[8],
      customer_country: row[9],
      subscription: row[10],
      membership_id: row[11],
    };

    // Get membership_id from request body
    const membership_id = req.body.membership_id;

    // Use provided values or fall back to existing ones
    const updatedCustomer = {
      customer_first_name: req.body.customer_first_name || existingCustomer.customer_first_name,
      customer_last_name: req.body.customer_last_name || existingCustomer.customer_last_name,
      customer_email: req.body.customer_email || existingCustomer.customer_email,
      customer_phone: req.body.customer_phone || existingCustomer.customer_phone,
      customer_street_address: req.body.customer_street_address || existingCustomer.customer_street_address,
      customer_city: req.body.customer_city || existingCustomer.customer_city,
      customer_province: req.body.customer_province || existingCustomer.customer_province,
      customer_postal_code: req.body.customer_postal_code || existingCustomer.customer_postal_code,
      customer_country: req.body.customer_country || existingCustomer.customer_country,
      subscription: req.body.subscription || existingCustomer.subscription,
      membership_id:
      req.body.subscription === "No"
      ? null
      : (membership_id !== undefined &&
         membership_id !== "" &&
         !isNaN(membership_id)
          ? parseInt(membership_id)
          : existingCustomer.membership_id),
        };

    await connection.execute(
      `UPDATE CUSTOMERS
       SET customer_first_name = :1,
           customer_last_name = :2,
           customer_email = :3,
           customer_phone = :4,
           customer_street_address = :5,
           customer_city = :6,
           customer_province = :7,
           customer_postal_code = :8,
           customer_country = :9,
           subscription = :10,
           membership_id = :11
       WHERE customer_id = :12`,
      [
        updatedCustomer.customer_first_name,
        updatedCustomer.customer_last_name,
        updatedCustomer.customer_email,
        updatedCustomer.customer_phone,
        updatedCustomer.customer_street_address,
        updatedCustomer.customer_city,
        updatedCustomer.customer_province,
        updatedCustomer.customer_postal_code,
        updatedCustomer.customer_country,
        updatedCustomer.subscription,
        updatedCustomer.membership_id,
        customerId,
      ],
      { autoCommit: true }
    );

    await connection.close();
    res.json({ message: "Customer updated successfully" });
  } catch (err) {
    console.error("Error updating customer:", err.message || err);
    res.status(500).json({ message: "Error updating customer", error: err.message || err });
  }
};

// Delete a customer by ID
export const deleteCustomer = async (req, res) => {
  const customerId = req.params.customerId;

  try {
    const connection = await oracledb.getConnection(config.db);

    await connection.execute(
      `DELETE FROM CUSTOMERS WHERE customer_id = :id`,
      [customerId],
      { autoCommit: true }
    );

    await connection.close();
    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    console.error("Error deleting customer:", err.message || err);
    res.status(500).json({ message: "Error deleting customer", error: err.message || err });
  }
};
