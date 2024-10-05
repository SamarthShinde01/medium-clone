import express from "express";
import {
	blogBulkController,
	blogGetController,
	blogPostController,
	blogUpdateController,
} from "../controllers/blogController.js";
import protect from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", protect, blogPostController);
router.put("/:id", blogUpdateController);
router.get("/bulk", blogBulkController);
router.get("/:id", blogGetController);

export default router;
