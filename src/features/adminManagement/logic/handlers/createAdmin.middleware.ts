import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { AdminModel, EmployeeModel, UserModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {},
  {},
  { fullName: string; email: string; username: string; password: string }
>;

const createAdminHandler = async (req: HandlerRequest, res: Response) => {
  const { fullName, email, username, password } = req.body;

  const existingAdmin = await AdminModel.findOne({
    $or: [{ email }, { username }],
  });

  if (existingAdmin) {
    const reason = existingAdmin.email === email ? "email" : "username";
    return res.status(400).json({
      message: `Admin already exists with this ${reason}`,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({ password: hashedPassword });
  const admin = await AdminModel.create({
    fullName,
    email,
    username,
    userId: user._id,
  });

  res.status(201).json({
    ...admin.toObject(),
    _id: undefined,
    __v: undefined,
  });
};

export default createAdminHandler;
