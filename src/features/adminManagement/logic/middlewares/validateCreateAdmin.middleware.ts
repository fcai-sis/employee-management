import * as validator from "express-validator";
import { Request, Response, NextFunction } from "express";

const validateCreateAdminMiddleware = [
  validator
    .body("fullName")
    .exists()
    .withMessage("Full name is required")
    .isString()
    .withMessage("Full name must be a string"),
  validator
    .body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  validator
    .body("username")
    .exists()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username must be a string"),
  validator
    .body("password")
    .exists()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

export default validateCreateAdminMiddleware;
