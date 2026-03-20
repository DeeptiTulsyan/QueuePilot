import express from "express";
import { serveNext } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/serve-next", protect, adminOnly, serveNext);

export default router;