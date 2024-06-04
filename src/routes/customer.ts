import { Router } from "express";
import Customer from "../controllers/customer/customer";

const customer = new Customer();
const router = Router();

router.post("/identify", (req, res) => {
  customer.identifyCustomer(req, res);
});

export default router;
