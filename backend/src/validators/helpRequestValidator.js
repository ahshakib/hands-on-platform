import { body, validationResult } from "express-validator";

const validateHelpRequest = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("urgency").isIn(["low", "medium", "urgent"]).withMessage("Invalid urgency level"),
  body("location").notEmpty().withMessage("Location is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateHelpRequest;
