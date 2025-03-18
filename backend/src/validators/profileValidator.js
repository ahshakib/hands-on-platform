import { body, validationResult } from "express-validator";

const validateProfile = [
  body("name").optional().isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
  body("skills").optional().isArray().withMessage("Skills must be an array"),
  body("causes").optional().isArray().withMessage("Causes must be an array"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateProfile;
