import mongoose from 'mongoose';

const OrdersSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
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
    default: 'PENDING', // PENDING, APPROVED, REJECTED
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
});

const Order = mongoose.model('Order', OrdersSchema);

export default Order;
