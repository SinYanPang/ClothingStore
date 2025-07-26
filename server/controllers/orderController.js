import oracledb from "oracledb";
import config from "./../../config/config.js";

export const getOrderDetails = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const connection = await oracledb.getConnection(config.db);

    // Fetch order info
    const orderResult = await connection.execute(
      `SELECT * FROM ORDERS WHERE order_id = :id`,
      [orderId]
    );

    if (orderResult.rows.length === 0) {
      await connection.close();
      return res.status(404).json({ message: 'Order not found' });
    }

    const orderRow = orderResult.rows[0];
    const order = {
      order_id: orderRow[0],
      customer_id: orderRow[1],
      order_date: orderRow[2],
      ship_date: orderRow[3],
      order_status: orderRow[4],
    };

    // Fetch order items
    const itemsResult = await connection.execute(
      `SELECT * FROM ORDERITEMS WHERE order_id = :id`,
      [orderId]
    );

    const items = itemsResult.rows.map((row) => ({
      item_id: row[0],
      order_id: row[1],
      product_id: row[2],
      quantity: row[3],
      paid_each: row[4],
    }));

    await connection.close();

    res.json({ order, items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching order details' });
  }
};
