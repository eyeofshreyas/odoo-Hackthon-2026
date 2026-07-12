const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },

    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
    },

    expenseCategory: {
      type: String,
      required: true,
      enum: [
        "Fuel",
        "Maintenance",
        "Repair",
        "Toll",
        "Insurance",
        "Parking",
        "Other",
      ],
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: false,
    },
  }
);

module.exports = mongoose.model("Expense", expenseSchema);