import { Router } from "express";
import Health from "../controllers/health/health";

const health = new Health();
const router = Router();

router.get("/", (req, res) => {
  health.getHealth(req, res);
});

export default router;
