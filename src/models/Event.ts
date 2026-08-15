import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  type: 'hackathon' | 'conference' | 'workshop' | 'talk';
  date: string;
  description: string;
  imageUrl?: string;
  link?: string;
  location?: string;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['hackathon', 'conference', 'workshop', 'talk'], required: true },
  date: {
    type: Date,
    required: [true, "Please provide a date for this event."],
    index: true,
  },
  description: { type: String, required: true },
  imageUrl: { type: String },
  link: { type: String },
  location: { type: String }
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
