import { Router } from "express";
import { asyncHandler } from "@fcai-sis/shared-utilities";

import createEmployeeHandler from "./logic/handlers/createEmployee.middleware";
import validateCreateEmployeeMiddleware from "./logic/middlewares/validateCreateEmployee.middleware";

export default (router: Router) => {
  router.post(
    "/",

    // Validate example message
    validateCreateEmployeeMiddleware,

    // Handle example request
    asyncHandler(createEmployeeHandler)
  );
};
