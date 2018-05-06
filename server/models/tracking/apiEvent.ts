import * as mongoose from 'mongoose';

const apiEventSchema = new mongoose.Schema({
  _apiId: mongoose.Schema.Types.ObjectId,
  httpStatus: Number,
  responseTimeMilliseconds: Number,
  responseSize: Number,

  date: Date,
  dayOfWeek: String,
  dayOfMonth: Number,
  month: Number,
  year: Number
  
});

const ApiEvent = mongoose.model('ApiEvent', apiEventSchema);

export default ApiEvent;
