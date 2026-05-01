import dotenv from 'dotenv';
dotenv.config();

const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/trustpulse',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_not_for_production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  OPENFOODFACTS_BASE_URL: process.env.OPENFOODFACTS_BASE_URL || 'https://world.openfoodfacts.org/api/v2',
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE, 10) || 5 * 1024 * 1024, // 5MB
  UPLOAD_PATH: process.env.UPLOAD_PATH || './uploads',
};

export default env;
