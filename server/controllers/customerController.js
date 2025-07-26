import oracledb from "oracledb";
import config from "./../../config/config.js";

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
      membership_id: row[10],
    };

    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching customer" });
  }
};