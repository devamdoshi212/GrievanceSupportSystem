const { CustomError } = require("../utils/router-utils");
const userModel = require("../models/user-models");
const { ok200 } = require("../utils/response-utils");
const grievanceTypeModel = require("../models/grievanceType-models");
const { mongoose } = require("mongoose");

async function addGrievanceType(req, res, next) {
  const { name } = req.body;
  if (!name) {
    throw new CustomError("Invalid Request", 400);
  }

  const type = await grievanceTypeModel.findOne({
    name,
  });
  if (type) {
    throw new CustomError("Grievance Type already exists", 400);
  }

  const newType = new grievanceTypeModel({
    name,
  });
  await newType.save();
  ok200(res);
}

async function getAllGrievanceType(req, res, next) {
  const grievanceTypes = await grievanceTypeModel.find({ is_active: 1 });
  ok200(res, grievanceTypes);
}
module.exports = {
  addGrievanceType,
  getAllGrievanceType,
};
