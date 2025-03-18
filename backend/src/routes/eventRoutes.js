import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  joinEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import protect from "../middlewares/authMiddleware.js";
import validateEvent from "../validators/eventValidator.js";

const router = express.Router();

router.post("/", protect, validateEvent, createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/:id/join", protect, joinEvent);
router.delete("/:id", protect, deleteEvent);

export default router;
