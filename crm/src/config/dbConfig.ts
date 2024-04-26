import mongoose from 'mongoose';
import 'dotenv/config';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL || '', {
      user: 'dev',
      pass: 'dev',
      dbName: 'crm_db',
    });

    console.log('Base de datos conectada!');
  } catch (error) {
    console.error(error);
  }
};
