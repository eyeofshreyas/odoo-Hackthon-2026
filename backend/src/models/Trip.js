const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },

    cargoWeight: {
      type: Number,
      required: true,
      min: 0,
    },

    plannedDistance: {
      type: Number,
      required: true,
      min: 0,
    },

    actualDistance: {
      type: Number,
      min: 0,
    },

    startOdometer: {
      type: Number,
      min: 0,
    },

    endOdometer: {
      type: Number,
      min: 0,
    },

    fuelConsumed: {
      type: Number,
      min: 0,
    },

    revenue: {
      type: Number,
      min: 0,
    },

    startTime: {
      type: Date,
    },

    endTime: {
      type: Date,
    },

    status: {
      type: String,
      enum: [
        "Draft",
        "Dispatched",
        "Completed",
        "Cancelled",
      ],
      default: "Draft",
      required: true,
    },

    completionNotes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: false,
    },
  }
);

module.exports = mongoose.model("Trip", tripSchema);