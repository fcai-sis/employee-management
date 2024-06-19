import { Router } from "express";
import { asyncHandler } from "@fcai-sis/shared-utilities";

import createEmployeeHandler from "./logic/handlers/createEmployee.handler";
import validateCreateEmployeeRequestMiddleware from "./logic/middlewares/validateCreateEmployeeRequest.middleware";
import { Role, checkRole } from "@fcai-sis/shared-middlewares";

export default (router: Router) => {
  router.post(
    "/employee",
    checkRole([Role.ADMIN]),
    validateCreateEmployeeRequestMiddleware,
    asyncHandler(createEmployeeHandler)
  );
};
