import { Router } from "express";
const router = Router();
import Health from "./health";
import Customer from "./customer";

router.use("/health", Health);
router.use("/customers", Customer);

export default router;
