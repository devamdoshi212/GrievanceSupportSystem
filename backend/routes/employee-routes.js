const express = require("express");
const { asyncRouteHandler } = require("../utils/router-utils");
const { ok200 } = require("../utils/response-utils");
const { authMiddleware } = require("../middlewares/auth-middleware");
const { verify } = require("../controllers/common-controller");
const {
  addGrievance,
  getAllGrievanceType,
  getGrievance,
} = require("../controllers/grievance-controller");
const { multerConfig } = require("../utils/upload-files-utils");

const router = express.Router();
router.use(authMiddleware("EMPLOYEE"));
router.get("/verify", asyncRouteHandler(verify));

router.get("/getAllGrievanceType", asyncRouteHandler(getAllGrievanceType));
router.post(
  "/addGrievance",
  multerConfig.array("attachments", 5),
  asyncRouteHandler(addGrievance)
);
router.get("/getGrievance", asyncRouteHandler(getGrievance));
router.get(
  "/dashboard",
  asyncRouteHandler((req, res) => {
    ok200(res);
  })
);

module.exports = router;
