import config from "./config/config.js";
import app from "./server/express.js";
import oracledb from "oracledb";

// Attempt DB connection
async function startServer() {
  try {
    const connection = await oracledb.getConnection({
      user: config.db.user,
      password: config.db.password,
      connectString: config.db.connectString,
    });

    console.log("✅ Connected to Oracle Database");

    // Store the connection if needed globally
    // global.db = connection;

    app.get("/", (req, res) => {
      res.json({ message: "Welcome to SQL-based User application." });
    });

    app.listen(config.port, () => {
      console.info(`🚀 Server started on port ${config.port}`);
    });
  } catch (err) {
    console.error("❌ Oracle DB connection error:", err);
  }
}

startServer();