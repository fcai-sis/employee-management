import { Request, Response } from 'express';
import { EmployeeModel } from '@fcai-sis/shared-models';

type HandlerRequest = Request<{}, {}, { fullName: string, email: string, username: string }>;

const createEmployeeHandler = async (req: HandlerRequest, res: Response) => {
  const { fullName, email, username } = req.body;

  const employee = await EmployeeModel.create({ fullName, email, username });

  res.status(201).json({
    ...employee.toObject(),
    _id: undefined,
    __v: undefined,
  });
}

export default createEmployeeHandler;
