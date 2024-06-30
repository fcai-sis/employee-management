import bcrypt from "bcrypt";
import { Request, Response } from "express";
import {
  AdminModel,
  IAdmin,
  RoleEnum,
  UserModel,
} from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {},
  {},
  {
    admin: Partial<IAdmin>;
    password: string;
  }
>;

const createAdminHandler = async (req: HandlerRequest, res: Response) => {
  const { admin, password } = req.body;

  const existingAdmin = await AdminModel.findOne({
    $or: [{ email: admin.email }, { username: admin.username }],
  });

  if (existingAdmin) {
    const reason = existingAdmin.email === admin.email ? "email" : "username";
    return res.status(400).json({
      message: `Admin already exists with this ${reason}`,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    password: hashedPassword,
    role: RoleEnum[0],
  });
  const createdAdmin = await AdminModel.create({
    fullName: admin.fullName,
    email: admin.email,
    username: admin.username,
    user: user._id,
  });

  res.status(201).json({
    admin: {
      ...createdAdmin.toJSON(),
      _id: undefined,
      __v: undefined,
    },
  });
};

export default createAdminHandler;
