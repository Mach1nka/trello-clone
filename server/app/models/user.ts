import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.model('users', UserSchema);
