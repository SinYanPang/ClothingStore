import express from "express";
import { getCustomerById } from "../controllers/customerController.js";

const router = express.Router();

router.get("/api/customers/:customerId", getCustomerById);

export default router;