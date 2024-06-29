const md5 = require("md5");
const mongoose = require("mongoose");

const grievanceTypeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  is_active: { type: Number, default: 1 },
});
const grievanceTypeModel = mongoose.model(
  "grievanceTypes",
  grievanceTypeSchema
);
module.exports = grievanceTypeModel;
