import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  start_time: {
    type: Date,
    required: true,
    default: Date.now
  },
  stop_time: {
    type: Date
  },
  description: {
    type: String,
    required: true,
  },
  
  
}, {
  timestamps: true,
});

const TrackModel = mongoose.model('Track', TrackSchema);

export default TrackModel;
