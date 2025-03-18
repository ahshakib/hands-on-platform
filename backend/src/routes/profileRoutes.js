import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import protect from "../middlewares/authMiddleware.js";
import validateProfile from "../validators/profileValidator.js";

const router = express.Router();

router.get("/", protect, getProfile);
router.patch("/", protect, validateProfile, updateProfile);

export default router;
