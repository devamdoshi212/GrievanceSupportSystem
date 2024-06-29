const crypto = require("crypto");
const { CustomError } = require("../utils/router-utils");
const userModel = require("../models/user-models");
const { ok200 } = require("../utils/response-utils");
const { sendMailToPersons } = require("../utils/mail-utils");
const { mongoose } = require("mongoose");
function generatePassword(length) {
  return crypto.randomBytes(length).toString("base64").slice(0, length);
}
async function addEmployeeAndHr(req, res, next) {
  const { role, fullname, email, grievanceTypeId = null } = req.body;
  if (!role || !fullname || !email) {
    throw new CustomError("Invalid Request", 400);
  }
  const user = await userModel.findOne({ email, is_active: 1 });
  if (user) {
    throw new CustomError("Username already exists", 400);
  }
  password = generatePassword(8);
  await sendMailToPersons([{ email, password }]);
  const newUser = new userModel({
    role,
    fullname,
    email,
    password,
    grievanceTypeId: new mongoose.Types.ObjectId(grievanceTypeId),
  });

  await newUser.save();
  ok200(res);
}
module.exports = {
  addEmployeeAndHr,
};
