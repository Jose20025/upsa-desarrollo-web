import mongoose from 'mongoose';

export type TProduct = {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  stock: number;
  price: number;
  dateCreated: Date;
};
