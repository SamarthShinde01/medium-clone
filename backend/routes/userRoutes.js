import express from "express";
import {
	userAuthorController,
	userGetController,
	userLogoutController,
	userSigninController,
	userSignupController,
	userUpdateController,
} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/signin", userSigninController);
router.post("/signup", userSignupController);
router.post("/logout", userLogoutController);
router.get("/profile", protect, userGetController);
router.get("/author", userAuthorController);
router.put("/profile", protect, userUpdateController);

export default router;
