import { Router } from "express";
import { asyncHandler } from "@fcai-sis/shared-utilities";

import createAdminHandler from "./logic/handlers/createAdmin.handler";
import validateCreateAdminRequestMiddleware from "./logic/middlewares/validateCreateAdminRequest.middleware";

export default (router: Router) => {
  router.post(
    "/admin",
    validateCreateAdminRequestMiddleware,
    asyncHandler(createAdminHandler)
  );
};
