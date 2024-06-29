const md5 = require("md5");
const mongoose = require("mongoose");
const grievanceTypeModel = require("./grievanceType-models");

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ["ADMIN", "HR", "EMPLOYEE"] },
  fullname: { type: String, trim: true },
  email: { type: String, unique: true, trim: true },
  phone: String,
  profile: {
    public_id: { type: String, trim: true },
    public_url: { type: String, trim: true },
  },
  password: String,
  grievanceTypeId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "grievancetypes",
  },
  grievanceIds: [{ type: mongoose.SchemaTypes.ObjectId, ref: "grievances" }],
  is_active: { type: Number, default: 1 },
});
userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    user.password = md5(user.password);
  }
  next();
});
const usersModel = mongoose.model("users", userSchema);
module.exports = usersModel;
