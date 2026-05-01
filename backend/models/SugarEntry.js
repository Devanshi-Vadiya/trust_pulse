import mongoose from 'mongoose';

const sugarEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    barcode: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    sub: {
      type: String,
      default: 'Manual Entry',
    },
    brand: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['Beverages', 'Dairy Alt', 'Snacks', 'Pastry', 'Meals', 'Other'],
      default: 'Other',
    },
    sugar: {
      type: Number,
      required: [true, 'Sugar amount is required'],
      min: 0,
    },
    teaspoons: {
      type: Number,
      default: 0,
    },
    dailyPercentage: {
      type: Number,
      default: 0,
    },
    risk: {
      type: String,
      enum: ['SAFE', 'WATCH', 'HIGH'],
      default: 'SAFE',
    },
    riskColor: { type: String, default: '#1d4ed8' },
    riskBg: { type: String, default: '#eff6ff' },
    emoji: { type: String, default: '🍽️' },
    ingredients: { type: String, default: '' },
    source: {
      type: String,
      enum: ['openfoodfacts', 'manual', 'mock'],
      default: 'manual',
    },
  },
  {
    timestamps: true,
  }
);

// Index for user history
sugarEntrySchema.index({ user: 1, createdAt: -1 });

const SugarEntry = mongoose.model('SugarEntry', sugarEntrySchema);
export default SugarEntry;
