const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    planName: {
      type: String,
      enum: ['Mini', 'Family', 'Ultra'],
      required: [true, 'Plan name is required'],
    },
    monthlyCost: {
      type: Number,
      required: true,
    },
    streamingQuality: {
      type: String,
      enum: ['SD', 'HD', 'Full HD', '4K Ultra HD'],
      required: true,
    },
    maxDevices: {
      type: Number,
      required: true,
    },
    watchlistLimit: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);
