import express from "express";
import { joinQueue, getQueueStatus } from "../controllers/queueController.js";

const router = express.Router();

router.post("/join", joinQueue);
router.get("/status/:userId", getQueueStatus);

export default router;