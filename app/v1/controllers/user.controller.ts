import { Request, Response } from "express";
import md5 from "md5";
import User from "../models/user.model";
// import ForgotPassword from "../models/forgot-password.model.js";

import {
  generateRandomNumber,
  generateRandomString,
} from "../../../helpers/generate";
// import sendMailHelper from "../../../helpers/sendMail.js";

// [POST] /api/v1/users/register
export const register = async (req: Request, res: Response): Promise<void> => {
  req.body.password = md5(req.body.password);

  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });

  if (existEmail) {
    res.json({
      code: 400,
      message: "Email đã tồn tại",
    });
  } else {
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      token: generateRandomString(30),
    });

    await user.save();

    const token = user.token;

    res.cookie("token", token);

    res.json({
      code: 200,
      message: "Tạo tài khoản thành công",
      token: token,
    });
  }
};

// [POST] /api/v1/users/login
export const login = async (req: Request, res: Response): Promise<void> => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    res.json({
      code: 400,
      message: "Email không tồn tại!",
    });
    return;
  }

  if (md5(password) != user.password) {
    res.json({
      code: 400,
      message: "Sai mật khẩu!",
    });
    return;
  }

  const token = user.token;
  res.cookie("token", token);

  res.json({
    code: 200,
    message: "Đăng nhập thành công!",
    token: token,
  });
};

// [GET] /api/v1/users/detail
export const detail = async (req: Request, res: Response): Promise<void> => {
  res.json({
    code: 200,
    message: "Thành công!",
    info: req["user"],
  });
};
