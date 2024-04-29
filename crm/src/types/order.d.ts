import mongoose from 'mongoose';
import { OrderStatus } from '../models/Order';

export interface TProductGroup {
  _id: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

export type TOrder = {
  _id: mongoose.Schema.Types.ObjectId;
  products: TProductGroup[];
  total: number;
  client: mongoose.Schema.Types.ObjectId;
  seller: mongoose.Schema.Types.ObjectId;
  status: OrderStatus;
  dateCreated: Date;
};
