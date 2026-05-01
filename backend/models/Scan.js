import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    code: {
      type: String,
      required: [true, 'Scan code is required'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['barcode', 'qr', 'manual'],
      default: 'manual',
    },
    module: {
      type: String,
      enum: ['sugar', 'alcohol', 'water', 'general'],
      default: 'general',
    },
    productName: {
      type: String,
      default: 'Unknown Product',
    },
    status: {
      type: String,
      enum: ['CLINICALLY SAFE', 'MODERATE RISK', 'HAZARDOUS', 'NOT FOUND', 'VERIFIED', 'SUSPICIOUS'],
      default: 'NOT FOUND',
    },
    statusColor: { type: String, default: '#6b7280' },
    statusBg: { type: String, default: '#f3f4f6' },
    icon: { type: String, default: '📦' },
    result: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for user scan history queries
scanSchema.index({ user: 1, createdAt: -1 });

const Scan = mongoose.model('Scan', scanSchema);
export default Scan;
