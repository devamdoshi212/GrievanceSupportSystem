const userModel = require("../models/user-models");
const jwt = require("jsonwebtoken");
const { ok200 } = require("../utils/response-utils");
const { CustomError } = require("../utils/router-utils");
const { uploadFile } = require("../utils/upload-files-utils");
const md5 = require("md5");
async function register(req, res) {
  const { role, username, fullname, email, phone, password } = req.body;
  if (!role || !username || !fullname || !email || !password || !phone) {
    throw new CustomError("Invalid Request", 400);
  }
  const user = await userModel.findOne({ email, is_active: 1 });
  if (user) {
    throw new CustomError("Username already exists", 400);
  }
  let profile = {};
  if (req.file) {
    const result = await uploadFile(
      req.file.buffer,
      req.file.originalname,
      "user_profile_images"
    );
    profile.public_id = result.public_id;
    profile.public_url = result.secure_url;
  }

  const newUser = new userModel({
    role,
    username,
    fullname,
    email,
    phone,
    profile,
    password,
  });

  await newUser.save();
  const token = jwt.sign(
    { _id: newUser._id, role, email },
    process.env.JWT_SECRET_CODE,
    { expiresIn: "1d" }
  );
  ok200(res, { token });
}

async function login(req, res, next) {
  const { role, email, password } = req.body;
  if (!role || !email || !password) {
    throw new CustomError("Invalid Request", 400);
  }
  console.log(role, email, md5(password));
  const user = await userModel.findOne({
    email,
    password: md5(password),
    role,
    is_active: 1,
  });
  if (!user) {
    throw new CustomError("Invalid Credentials", 400);
  }
  const token = jwt.sign(
    { _id: user._id, role, email },
    process.env.JWT_SECRET_CODE,
    { expiresIn: "1d" }
  );
  ok200(res, { token });
}

async function verify(req, res, next) {
  res.json({
    success: true,
    data: { ...res.locals.userData, iat: null, exp: null },
  });
}

module.exports = {
  register,
  login,
  verify,
};
