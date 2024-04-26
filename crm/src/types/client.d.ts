import mongoose from 'mongoose';

export type TClient = {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  lastName: string;
  company: string;
  email: string;
  phoneNumber: string;
  dateCreated: Date;
  seller: mongoose.Schema.Types.ObjectId;
};
