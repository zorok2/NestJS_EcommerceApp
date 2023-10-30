import { registerAs } from '@nestjs/config';

export const AppConfig = registerAs('app', () => ({
  isDev: process.env.NODE_ENV !== 'production',
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  apiKey: process.env.API_KEY || 'my-secret-key',
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    databaseName: process.env.DB_DATABASE || 'postgres',
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    bucket: process.env.FIREBASE_STORAGE_BUCKET,
  },
  jwt: {
    publicKey: process.env.JWT_PUBLIC_KEY,
    privateKey: process.env.JWT_PRIVATE_KEY,
  },
}));
