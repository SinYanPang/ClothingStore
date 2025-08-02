import express from "express";
import {
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from "../controllers/customerController.js";

const router = express.Router();

router.get("/api/customers/:customerId", getCustomerById);
router.put("/api/customers/:customerId", updateCustomer);   // Edit
router.delete("/api/customers/:customerId", deleteCustomer); // Delete

export default router;
