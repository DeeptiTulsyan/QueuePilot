import express from "express";
import { joinQueue, getQueueStatus, cancelToken } from "../controllers/queueController.js";


import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/join", protect, joinQueue);
router.get("/status", protect, getQueueStatus);
router.post("/cancel", protect, cancelToken);

export default router;