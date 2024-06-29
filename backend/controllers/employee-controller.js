const grievanceModel = require("../models/grievance-models");
const { sendMail } = require("../utils/mail-utils");
const { ok200 } = require("../utils/response-utils");
const { CustomError } = require("../utils/router-utils");

async function dashboard(req, res, next) {
  let pendingCount = await grievanceModel.countDocuments({
    userId: res.locals.userData._id,
    status: "pending",
  });
  let rejectedCount = await grievanceModel.countDocuments({
    userId: res.locals.userData._id,
    status: "rejected",
  });
  let resolvedCount = await grievanceModel.countDocuments({
    userId: res.locals.userData._id,
    status: "resolved",
  });
  ok200(res, {
    pendingCount,
    rejectedCount,
    resolvedCount,
  });
}

async function grievanceResolve(req, res, next) {
  const { id } = req.body;
  if (!id) {
    throw new CustomError("Invalid Request", 400);
  }
  const updatedGrievance = await grievanceModel.findOne({ _id: id });
  updatedGrievance.status = "resolved";
  await updatedGrievance.save();
  await updatedGrievance.populate("userId");
  sendMail(
    updatedGrievance.userId.email,
    "Issue Resolved",
    `Issue ${updatedGrievance.description} has been resolved`
  );

  ok200(res);
}

async function discussion(req, res, next) {
  const { grievanceId, message } = req.body;
  if (!grievanceId) {
    throw new CustomError("Invalid Request", 400);
  }
  let grievance = await grievanceModel.findByIdAndUpdate(grievanceId, {
    $push: { discussion: { label: res.locals.userData.role, message } },
  });
  ok200(res);
}

module.exports = {
  dashboard,
  grievanceResolve,
  discussion,
};
