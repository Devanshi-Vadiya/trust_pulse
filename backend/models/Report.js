import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      enum: ['contamination', 'mislabeling', 'allergen', 'counterfeit', 'other'],
      required: [true, 'Risk category is required'],
    },
    productName: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    evidence: [
      {
        filename: String,
        originalName: String,
        mimetype: String,
        size: Number,
        path: String,
      },
    ],
    status: {
      type: String,
      enum: ['submitted', 'under_review', 'resolved', 'dismissed'],
      default: 'submitted',
    },
  },
  {
    timestamps: true,
  }
);

reportSchema.index({ user: 1, createdAt: -1 });

const Report = mongoose.model('Report', reportSchema);
export default Report;
