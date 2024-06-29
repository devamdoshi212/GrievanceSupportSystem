const md5 = require("md5");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ["ADMIN", "USER"] },
  username: { type: String, unique: true, trim: true },
  fullname: { type: String, trim: true },
  email: { type: String, unique: true, trim: true },
  phone: String,
  profile: {
    public_id: { type: String, trim: true },
    public_url: { type: String, trim: true },
  },
  password: String,
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
