const mongoose = require("mongoose");

const serviceProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  company: {
    type: String,
    required: [true, "Company is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  service: {
    type: String,
    required: [true, "Service is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
});

const ServiceProvider = mongoose.model("ServiceProvider", serviceProviderSchema);

module.exports = ServiceProvider;
