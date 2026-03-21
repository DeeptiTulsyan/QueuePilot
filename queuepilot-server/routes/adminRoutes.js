import express from "express";
import { serveNext,getCurrentToken } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/serve-next", protect, adminOnly, serveNext);
router.get("/current", protect, adminOnly, getCurrentToken);
export default router;