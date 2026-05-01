import mongoose from 'mongoose';

const custodyEventSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    actor: { type: String, required: true },
    status: { type: String, required: true },
    statusType: {
      type: String,
      enum: ['cloned', 'verified', 'genesis'],
      required: true,
    },
  },
  { _id: false }
);

const alcoholProductSchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    productName: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    batchNumber: {
      type: String,
      required: true,
    },
    productionDate: {
      type: String,
      required: true,
    },
    distilleryLocation: {
      type: String,
      required: true,
    },
    intendedMarket: {
      type: String,
      required: true,
    },
    volume: {
      type: String,
      default: '750ml',
    },
    abv: {
      type: String,
      default: '40%',
    },
    description: {
      type: String,
      default: '',
    },
    scanCount: {
      type: Number,
      default: 0,
    },
    scanLocations: [
      {
        location: String,
        timestamp: { type: Date, default: Date.now },
        source: String,
      },
    ],
    status: {
      type: String,
      enum: ['genuine', 'suspicious', 'counterfeit', 'unknown'],
      default: 'genuine',
    },
    custodyHistory: [custodyEventSchema],
  },
  {
    timestamps: true,
  }
);

alcoholProductSchema.index({ productCode: 1 });

const AlcoholProduct = mongoose.model('AlcoholProduct', alcoholProductSchema);
export default AlcoholProduct;
