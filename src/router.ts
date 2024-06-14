import { Router } from "express";

import employeeManagementRoutes from "./features/employeeManagement/employeeManagement.routes";
import adminManagementRoutes from "./features/adminManagement/adminManagement.routes";

const router: Router = Router();

export default (): Router => {
  adminManagementRoutes(router);
  employeeManagementRoutes(router);

  return router;
};
