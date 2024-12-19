const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "Birthday Party",
        "Wedding",
        "Corporate Event",
        "Workshop",
        "Concert",
        "Exhibition",
        "Festival",
        "Networking Event",
        "Seminar",
        "Sports Event",
        "Fundraiser",
        "Community Gathering",
      ], // Restrict to predefined event types
    },
    host: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the user collection
      required: true,
    },
    live: {
        type: Boolean,
        default: true, // Default value is a Boolean (true or false)
      },
    serviceProviderIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the service provider collection
      },
    ],
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
