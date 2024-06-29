const grievanceModel = require("../models/grievance-models");
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
  const updatedGrievance = await grievanceModel.findByIdAndUpdate(id, {
    status: "resolved",
  });
  ok200(res);
}

module.exports = {
  dashboard,
  grievanceResolve,
};
