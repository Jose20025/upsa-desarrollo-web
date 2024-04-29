import mongoose from 'mongoose';
import { type TProductGroup, type TOrder } from '../types/order';

export enum OrderStatus {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
}

const productGroupSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema<TOrder>({
  total: {
    type: Number,
    required: true,
  },
  products: {
    type: [productGroupSchema],
    default: [],
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Client',
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  status: {
    type: String,
    default: OrderStatus.PENDING,
    enum: OrderStatus,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
});

const Order = mongoose.model<TOrder>('Order', orderSchema);

export default Order;
