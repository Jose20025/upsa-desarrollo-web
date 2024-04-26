import mongoose from 'mongoose';
import { type TUser } from '../types/user';

const userSchema = new mongoose.Schema<TUser>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model<TUser>('User', userSchema);

export default User;
