import express from "express";
import {
  createHelpRequest,
  getAllHelpRequests,
  getHelpRequestById,
  volunteerForHelpRequest,
  deleteHelpRequest,
} from "../controllers/helpRequestController.js";
import protect from "../middlewares/authMiddleware.js";
import validateHelpRequest from "../validators/helpRequestValidator.js";

const router = express.Router();

router.post("/", protect, validateHelpRequest, createHelpRequest);
router.get("/", getAllHelpRequests);
router.get("/:id", getHelpRequestById);
router.post("/:id/volunteer", protect, volunteerForHelpRequest);
router.delete("/:id", protect, deleteHelpRequest);

export default router;
