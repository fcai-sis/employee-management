import { Router } from "express";

import employeeManagementRoutes from "./features/example/employeeManagement.routes";

const router: Router = Router();

export default (): Router => {
  employeeManagementRoutes(router);

  return router;
};
