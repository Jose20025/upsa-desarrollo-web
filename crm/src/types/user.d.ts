import mongoose from 'mongoose';

export type TUser = {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  lastName: string;
  email: string;
  password: string;
  dateCreated: Date;
};
