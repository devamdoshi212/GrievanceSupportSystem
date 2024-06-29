const md5 = require("md5");
const mongoose = require("mongoose");

const grievanceTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: [
      "Workplace Harassment",
      "Workplace Harassment - Sexual Harassment",
      "Workplace Harassment - Bullying",
      "Workplace Harassment - Discrimination",
      "Work Conditions",
      "Work Conditions - Health and Safety Concerns",
      "Work Conditions - Unfavorable Work Environment",
      "Work Conditions - Ergonomic Issues",
      "Compensation and Benefits",
      "Compensation and Benefits - Salary Discrepancies",
      "Compensation and Benefits - Unpaid Wages or Overtime",
      "Compensation and Benefits - Benefits Issues",
      "Workplace Policies",
      "Workplace Policies - Violation of Company Policies",
      "Workplace Policies - Inconsistent Application of Policies",
      "Workplace Policies - Unfair Disciplinary Actions",
      "Interpersonal Conflicts",
      "Interpersonal Conflicts - Conflicts with Co-workers",
      "Interpersonal Conflicts - Conflicts with Supervisors or Managers",
      "Workload and Job Responsibilities",
      "Workload and Job Responsibilities - Unmanageable Workload",
      "Workload and Job Responsibilities - Unclear Job Expectations",
      "Workload and Job Responsibilities - Inadequate Resources or Support",
      "Career Development",
      "Career Development - Lack of Training or Development Opportunities",
      "Career Development - Unfair Promotion Practices",
      "Career Development - Performance Review Disputes",
      "Ethical and Legal Concerns",
      "Ethical and Legal Concerns - Fraud or Misconduct",
      "Ethical and Legal Concerns - Compliance Issues",
      "Ethical and Legal Concerns - Whistleblowing",
    ],
  },
  hrId: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
  is_active: { type: Number, default: 1 },
});
const grievanceTypeModel = mongoose.model(
  "grievanceTypes",
  grievanceTypeSchema
);
module.exports = grievanceTypeModel;
