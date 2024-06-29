const dontenv = require("dotenv");
dontenv.config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./utils/database-utils");
const { interceptor, asyncRouteHandler } = require("./utils/router-utils");
const morgan = require("morgan");
const userRoutes = require("./routes/user-routes");
const adminRoutes = require("./routes/admin-routes");
const { errorHandler } = require("./controllers/error-controller");
const { register, login } = require("./controllers/common-controller");
const { multerConfig } = require("./utils/upload-files-utils");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(interceptor);
app.use(morgan("tiny"));

app.use(
  "/register",
  multerConfig.single("profile"),
  asyncRouteHandler(register)
);
app.use("/login", asyncRouteHandler(login));
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.use(errorHandler);
app.all("*", (req, res, next) => {
  next({ message: "Invalid Route", stack: "app.js" });
});
dbConnection()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server Started at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
