import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || '5000',
  mongoUri: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || '',
  usdaApiKey: process.env.USDA_API_KEY || '',
  env: process.env.NODE_ENV || 'development',
};
