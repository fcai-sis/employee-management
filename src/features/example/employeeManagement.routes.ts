import { Router } from "express";
import { asyncHandler } from "@fcai-sis/shared-utilities";

import validateCreateEmployeeMiddleware from "./logic/middlewares/validateCreateEmployee.middleware";
import createEmployeeHandler from "./logic/handlers/createEmployee.middleware";

export default (router: Router) => {
  router.post(
    "/",

    // Validate example message
    validateCreateEmployeeMiddleware,

    // Handle example request
    asyncHandler(createEmployeeHandler)
  );
};
