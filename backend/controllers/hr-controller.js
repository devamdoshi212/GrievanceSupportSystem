const { default: mongoose } = require("mongoose");
const grievanceModel = require("../models/grievance-models");
const usersModel = require("../models/user-models");
const { ok200 } = require("../utils/response-utils");
const { CustomError } = require("../utils/router-utils");

async function dashboard(req, res, next) {
  let userData = await usersModel.find({ _id: res.locals.userData._id });
  let pendingCount = await grievanceModel.countDocuments({
    grievanceId: new mongoose.Types.ObjectId(userData.grievanceTypeId),
    status: "pending",
  });
  let rejectedCount = await grievanceModel.countDocuments({
    grievanceId: new mongoose.Types.ObjectId(userData.grievanceTypeId),
    status: "rejected",
  });
  let resolvedCount = await grievanceModel.countDocuments({
    grievanceId: new mongoose.Types.ObjectId(userData.grievanceTypeId),
    status: "resolved",
  });
  ok200(res, {
    pendingCount,
    rejectedCount,
    resolvedCount,
  });
}

async function grievanceRejected(req, res, next) {
  const { id } = req.body;
  if (!id) {
    throw new CustomError("Invalid Request", 400);
  }
  const updatedGrievance = await grievanceModel.findByIdAndUpdate(id, {
    status: "rejected",
  });
  ok200(res);
}
async function hrAllGrievance(req, res, next) {
  let hr = await usersModel.find({ _id: res.locals.userData._id });
  let grievance = await grievanceModel.find({
    grievanceId: hr[0].grievanceTypeId,
    is_active: 1,
  });
  ok200(res, { grievance, hr });
}
module.exports = {
  dashboard,
  grievanceRejected,
  hrAllGrievance,
};
