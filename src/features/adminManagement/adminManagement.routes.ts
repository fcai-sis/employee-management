import { Router } from "express";
import { asyncHandler } from "@fcai-sis/shared-utilities";

import createAdminHandler from "./logic/handlers/createAdmin.middleware";
import validateCreateAdminMiddleware from "./logic/middlewares/validateCreateAdmin.middleware";

export default (router: Router) => {
  router.post(
    "/admin",

    validateCreateAdminMiddleware,

    asyncHandler(createAdminHandler)
  );
};
