import * as mongoose from 'mongoose';

const apiSchema = new mongoose.Schema({
  hostName: String,
  headers: [
    {
      key: String,
      value: String
    }
  ],
  path: String,
  method: String,
  data: String
});

const Api = mongoose.model('Api', apiSchema);

export default Api;
