const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    checkedInAt: { type: Date, default: Date.now },
    checkedOutAt: { type: Date },
    resident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Visitor', VisitorSchema);
