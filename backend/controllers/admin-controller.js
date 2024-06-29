const crypto = require("crypto");
const { CustomError } = require("../utils/router-utils");
const userModel = require("../models/user-models");
const { ok200 } = require("../utils/response-utils");
const { sendMailToPersons } = require("../utils/mail-utils");
const { mongoose } = require("mongoose");
const grievanceModel = require("../models/grievance-models");
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
async function getHrWithGrievance(req, res, next) {
  let hr = await userModel
    .find({ role: "HR", is_active: 1 })
    .populate("grievanceTypeId")
    .lean();
  for (let i = 0; i < hr.length; i++) {
    let grievanceTypeId = hr[i].grievanceTypeId._id;
    let grievances = await grievanceModel
      .find({
        grievanceId: grievanceTypeId,
      })
      .populate("userId");
    let pendingCount = await grievanceModel.countDocuments({
      grievanceId: grievanceTypeId,
      status: "pending",
    });
    let rejectedCount = await grievanceModel.countDocuments({
      grievanceId: grievanceTypeId,
      status: "rejected",
    });
    let resolvedCount = await grievanceModel.countDocuments({
      grievanceId: grievanceTypeId,
      status: "resolved",
    });

    hr[i].grievances = grievances;
    hr[i].pending = pendingCount;
    hr[i].rejected = rejectedCount;
    hr[i].resolved = resolvedCount;
  }
  ok200(res, { hr });
}
async function dashboard(req, res, next) {
  let pendingCount = await grievanceModel.countDocuments({
    status: "pending",
  });
  let rejectedCount = await grievanceModel.countDocuments({
    status: "rejected",
  });
  let resolvedCount = await grievanceModel.countDocuments({
    status: "resolved",
  });
  ok200(res, {
    pendingCount,
    rejectedCount,
    resolvedCount,
  });
}
async function hrAllGrievance(req, res, next) {
  const { grievanceId } = req.body;
  if (!grievanceId) {
    throw new CustomError("Invalid Request", 400);
  }
  let grievance = await grievanceModel.find({ grievanceId, is_active: 1 });
  ok200(res, { grievance });
}
module.exports = {
  addEmployeeAndHr,
  getHrWithGrievance,
  dashboard,
  hrAllGrievance,
};
