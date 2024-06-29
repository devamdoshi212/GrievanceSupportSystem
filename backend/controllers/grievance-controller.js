const { CustomError } = require("../utils/router-utils");
const userModel = require("../models/user-models");
const { ok200 } = require("../utils/response-utils");
const grievanceTypeModel = require("../models/grievanceType-models");
const { mongoose } = require("mongoose");
const grievanceModel = require("../models/grievance-models");
const { uploadFile } = require("../utils/upload-files-utils");

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
async function addGrievance(req, res, next) {
  const { grievanceId, description } = req.body;

  if (!grievanceId || !description) {
    throw new CustomError("Invalid Request", 400);
  }

  let attachments = [];
  if (req.files) {
    for (let file of req.files) {
      const result = await uploadFile(
        file.buffer,
        file.originalname,
        `${grievanceId}/${file.originalname}`
      );
      attachments.push({
        public_id: result.public_id,
        public_url: result.secure_url,
      });
    }
  }

  const newGrievance = new grievanceModel({
    userId: new mongoose.Types.ObjectId(res.locals.userData._id),
    grievanceId: new mongoose.Types.ObjectId(grievanceId),
    description,
    attachments,
  });

  await newGrievance.save();
  ok200(res, {});
}
async function getGrievance(req, res, next) {
  let grievances = await grievanceModel.find({
    userId: res.locals.userData._id,
  });
  ok200(res, grievances);
}
module.exports = {
  addGrievanceType,
  getAllGrievanceType,
  addGrievance,
  getGrievance,
};
