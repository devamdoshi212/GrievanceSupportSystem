const express = require("express");
const { asyncRouteHandler } = require("../utils/router-utils");
const { ok200 } = require("../utils/response-utils");
const { authMiddleware } = require("../middlewares/auth-middleware");
const { verify } = require("../controllers/common-controller");

const router = express.Router();
router.use(authMiddleware("USER"));
router.get("/verify", asyncRouteHandler(verify));
router.get(
  "/dashboard",
  asyncRouteHandler((req, res) => {
    ok200(res);
  })
);

module.exports = router;
