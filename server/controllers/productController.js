import oracledb from "oracledb";
import config from "./../../config/config.js";

export const getAllProducts = async (req, res) => {
  try {
    const connection = await oracledb.getConnection(config.db);

    const result = await connection.execute(`SELECT * FROM PRODUCTS`);

    await connection.close();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    const products = result.rows.map((row) => ({
      product_id: row[0],
      product_name: row[1],
      category_id: row[2],
      product_price: row[3],
      product_color: row[4],
      product_size: row[5],
    }));

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Error fetching products" });
  }
};