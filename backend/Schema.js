// Schema.js
const mongoose = require("mongoose");

const UserSchema = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  userType: String
}));

const ComplaintSchema = mongoose.model("Complaint", new mongoose.Schema({
  userId: String,
  name: String,
  city: String,
  state: String,
  address: String,
  pincode: String,
  comment: String,
  status: String,
}));

const AssignedComplaint = mongoose.model("AssignedComplaint", new mongoose.Schema({
  agentId: String,
  complaintId: String,
  status: String,
}));

const MessageSchema = mongoose.model("Message", new mongoose.Schema({
  name: String,
  message: String,
  complaintId: String,
  createdAt: { type: Date, default: Date.now }
}));

module.exports = {
  UserSchema,
  ComplaintSchema,
  AssignedComplaint,
  MessageSchema,
};
