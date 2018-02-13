const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  value: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
}, { versionKey: false });

module.exports = mongoose.model('Item', ItemSchema);
