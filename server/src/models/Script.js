import mongoose from 'mongoose';

const scriptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  script: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'en'
  }
}, { timestamps: true });

export const Script = mongoose.model('Script', scriptSchema);