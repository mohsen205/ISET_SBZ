const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  idNumber: { type: String, trim: true, required: true, unique: true },
  uidNumber: { type: String, trim: true, required: true, unique: true },
  fullName: { type: String, trim: true, required: true },
  class: { type: String, trim: true, required: true },
  domain: { type: String, trim: true, required: true },
  order: { type: String, trim: true, required: true },
  startWorkingDate: { type: Date, required: true },
  administrativeStatus: { type: String, required: true },
  phoneNumber: { type: String, trim: true, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
});

const Worker = mongoose.model("Worker", workerSchema);

module.exports = Worker;
