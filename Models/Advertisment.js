const mongoose = require("mongoose");

const Advertisment = new mongoose.Schema({
  Title: String,
  Company: String,
  City: String,
  Level: String,
  Earnings: String,
  Form: String,
  Date: String,
  PartTime: String,
  Owner: String,

  ExpectedTechnologies: [String],
  AdditionalTechnologies: [String],
  Responsibilities: [String],
  Requirements: [String],
});

module.exports = mongoose.model("Advertisement", Advertisment);
