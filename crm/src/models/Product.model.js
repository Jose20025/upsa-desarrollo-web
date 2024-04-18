import mongoose from 'mongoose';

const ProductsSchema = new mongoose.Schema({
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

const Product = mongoose.model('Product', ProductsSchema);

export default Product;
