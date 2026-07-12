const mongoose = require("mongoose");

const maintenanceLogSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    maintenanceType: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    cost: {
      type: Number,
      required: true,
      min: 0,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
    },

    status: {
      type: String,
      required: true,
      enum: ["Active", "Completed"],
      default: "Active",
    },

    assignedTechnician: {
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

module.exports = mongoose.model("MaintenanceLog", maintenanceLogSchema);