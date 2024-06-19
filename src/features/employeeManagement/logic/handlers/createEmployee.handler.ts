import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { EmployeeModel, IEmployee, UserModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {},
  {},
  {
    employee: Partial<IEmployee>;
    password: string;
  }
>;

const createEmployeeHandler = async (req: HandlerRequest, res: Response) => {
  const { employee, password } = req.body;

  const existingEmployee = await EmployeeModel.findOne({
    $or: [{ email: employee.email }, { username: employee.username }],
  });

  if (existingEmployee) {
    const reason =
      existingEmployee.email === employee.email ? "email" : "username";
    return res.status(400).json({
      message: `Employee already exists with this ${reason}`,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({ password: hashedPassword });
  const createdEmployee = await EmployeeModel.create({
    fullName: employee.fullName,
    email: employee.email,
    username: employee.username,
    user: user._id,
  });

  res.status(201).json({
    employee: {
      ...createdEmployee.toJSON(),
      _id: undefined,
      __v: undefined,
    },
  });
};

export default createEmployeeHandler;
