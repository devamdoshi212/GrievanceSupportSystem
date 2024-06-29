const express = require("express");
const { asyncRouteHandler } = require("../utils/router-utils");
const { ok200 } = require("../utils/response-utils");
const { authMiddleware } = require("../middlewares/auth-middleware");
const { verify } = require("../controllers/common-controller");
const { addEmployeeAndHr } = require("../controllers/admin-controller");
const {
  addGrievanceType,
  getAllGrievanceType,
} = require("../controllers/grievance-controller");

const router = express.Router();
router.use(authMiddleware("ADMIN"));
router.get("/verify", asyncRouteHandler(verify));
router.post("/addEmployeeAndHr", asyncRouteHandler(addEmployeeAndHr));
router.post("/addGrievanceType", asyncRouteHandler(addGrievanceType));

router.get("/getAllGrievanceType", asyncRouteHandler(getAllGrievanceType));
router.get(
  "/dashboard",
  asyncRouteHandler((req, res) => {
    ok200(res);
  })
);

module.exports = router;
