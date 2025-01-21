import { Schema, model } from 'mongoose';

const delaySchema = new Schema({
  email: {
    type: String,
    required: true, 
    unique: true,
    index: true
  },
  delays: [
    {
      postId: String,
      delay: Number,
    },
  ],
});

export const delayModel = model('delays', delaySchema);