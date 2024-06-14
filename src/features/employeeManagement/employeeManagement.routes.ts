import { Router } from "express";
import { asyncHandler } from "@fcai-sis/shared-utilities";

import createEmployeeHandler from "./logic/handlers/createEmployee.middleware";
import validateCreateEmployeeMiddleware from "./logic/middlewares/validateCreateEmployee.middleware";
import { Role, checkRole } from "@fcai-sis/shared-middlewares";

export default (router: Router) => {
  router.post(
    "/employee",

    checkRole([Role.ADMIN]),

    // Validate example message
    validateCreateEmployeeMiddleware,

    // Handle example request
    asyncHandler(createEmployeeHandler)
  );
};
