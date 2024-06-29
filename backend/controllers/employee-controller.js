const grievanceModel = require("../models/grievance-models");

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

module.exports = {
  dashboard,
};
