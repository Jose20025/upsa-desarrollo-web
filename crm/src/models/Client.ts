import mongoose from 'mongoose';
import { type TClient } from '../types/client';

const clientSchema = new mongoose.Schema<TClient>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const Client = mongoose.model<TClient>('Client', clientSchema);

export default Client;
