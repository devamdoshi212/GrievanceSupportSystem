const md5 = require("md5");
const mongoose = require("mongoose");

const grievanceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    grievanceId: { type: mongoose.SchemaTypes.ObjectId, ref: "grievanceTypes" },
    title: String,
    status: {
      type: String,
      enum: ["pending", "resolved", "rejected"],
      default: "pending",
    },
    attachments: [
      {
        public_id: { type: String, trim: true },
        public_url: { type: String, trim: true },
      },
    ],
    resolvedDate: { type: Date },
    is_active: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);
const grievanceModel = mongoose.model("grievances", grievanceSchema);
module.exports = grievanceModel;