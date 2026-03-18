import express from "express";
import { joinQueue, getQueueStatus } from "../controllers/queueController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/join", protect, joinQueue);
router.get("/status", protect, getQueueStatus);

export default router;