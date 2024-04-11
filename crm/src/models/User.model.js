import mongoose from 'mongoose';

const UsersSchema = mongoose.Schema({
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
  email: {
    type: String,
    required: true,
    trim: true,
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

const User = mongoose.model('User', UsersSchema);

export default User;
