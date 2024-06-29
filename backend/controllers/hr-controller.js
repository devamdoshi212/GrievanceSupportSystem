const grievanceModel = require("../models/grievance-models");
const { ok200 } = require("../utils/response-utils");
const { CustomError } = require("../utils/router-utils");

async function dashboard(req, res, next) {
  let pendingCount = await grievanceModel.countDocuments({
    grievanceId: res.locals.userData.grievanceTypeId,
    status: "pending",
  });
  let rejectedCount = await grievanceModel.countDocuments({
    grievanceId: res.locals.userData.grievanceTypeId,
    status: "rejected",
  });
  let resolvedCount = await grievanceModel.countDocuments({
    grievanceId: res.locals.userData.grievanceTypeId,
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

module.exports = {
  dashboard,
  grievanceRejected,
};
