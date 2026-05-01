import mongoose from 'mongoose';

const chemicalAnalysisSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    target: { type: String, required: true },
    value: { type: String, required: true },
    status: {
      type: String,
      enum: ['OPTIMAL', 'SAFE', 'WARNING', 'DANGER'],
      default: 'SAFE',
    },
    statusColor: { type: String, default: '#16a34a' },
  },
  { _id: false }
);

const waterBatchSchema = new mongoose.Schema(
  {
    batchId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    supplier: {
      name: { type: String, required: true },
      id: { type: String, required: true },
      trustScore: { type: Number, default: 0, min: 0, max: 100 },
      certifications: [String],
      cleanRecord: { type: String, default: '' },
      facility: { type: String, default: '' },
    },
    tds: {
      type: Number,
      required: true,
      min: 0,
    },
    overallStatus: {
      type: String,
      enum: ['Clinically Safe', 'Moderate Risk', 'Unsafe'],
      default: 'Clinically Safe',
    },
    overallStatusDescription: {
      type: String,
      default: '',
    },
    reportStatus: {
      type: String,
      enum: ['FINALIZED', 'PENDING', 'UNDER REVIEW'],
      default: 'FINALIZED',
    },
    chemicalAnalysis: [chemicalAnalysisSchema],
    scanTime: {
      type: String,
      default: '',
    },
    certificate: {
      filename: { type: String, default: '' },
      size: { type: String, default: '' },
      signed: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

waterBatchSchema.index({ batchId: 1 });

const WaterBatch = mongoose.model('WaterBatch', waterBatchSchema);
export default WaterBatch;
