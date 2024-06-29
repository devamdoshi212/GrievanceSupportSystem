const express = require("express");
const { asyncRouteHandler } = require("../utils/router-utils");
const { ok200 } = require("../utils/response-utils");
const { authMiddleware } = require("../middlewares/auth-middleware");
const { verify } = require("../controllers/common-controller");
const {
  getGrievance,
  getGrievanceById,
} = require("../controllers/grievance-controller");
const { multerConfig } = require("../utils/upload-files-utils");
const {
  dashboard,
  grievanceRejected,
  hrAllGrievance,
  discussion,
} = require("../controllers/hr-controller");

const router = express.Router();
router.use(authMiddleware("HR"));
router.get("/verify", asyncRouteHandler(verify));

router.get("/getGrievance", asyncRouteHandler(getGrievance));
router.post("/getGrievanceById", asyncRouteHandler(getGrievanceById));
router.get("/dashboard", asyncRouteHandler(dashboard));
router.post("/grievanceRejected", asyncRouteHandler(grievanceRejected));
router.get("/hrAllGrievance", asyncRouteHandler(hrAllGrievance));
router.post("/discussion", asyncRouteHandler(discussion));

module.exports = router;
