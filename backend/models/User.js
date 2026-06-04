import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  employeeNumber: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
