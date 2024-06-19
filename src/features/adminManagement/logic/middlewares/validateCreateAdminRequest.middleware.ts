import * as validator from "express-validator";
import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";

const validateCreateAdminRequestMiddleware = [
  validator
    .body("admin.fullName")

    .exists()
    .withMessage("Full name is required")

    .isString()
    .withMessage("Full name must be a string"),

  validator
    .body("admin.email")

    .exists()
    .withMessage("Email is required")

    .isEmail()
    .withMessage("Email must be a valid email address"),

  validator
    .body("admin.username")

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

  validateRequestMiddleware,
];

export default validateCreateAdminRequestMiddleware;
