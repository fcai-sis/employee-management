import * as validator from "express-validator";
import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";

const validateCreateEmployeeRequestMiddleware = [
  validator
    .body("employee.fullName")

    .exists()
    .withMessage("Full name is required")

    .isString()
    .withMessage("Full name must be a string"),

  validator
    .body("employee.email")

    .exists()
    .withMessage("Email is required")

    .isEmail()
    .withMessage("Email must be a valid email address"),

  validator
    .body("employee.username")

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

export default validateCreateEmployeeRequestMiddleware;
