import * as mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  status: String,
  size: Number,
  elapsedTime: Number
});

const Response = mongoose.model('Response', responseSchema);

export default Response;
