import mongoose from 'mongoose';
import { type TProduct } from '../types/product';

const productSchema = new mongoose.Schema<TProduct>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
});

const Product = mongoose.model<TProduct>('Product', productSchema);

export default Product;
