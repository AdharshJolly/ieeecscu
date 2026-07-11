import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  type: 'hackathon' | 'conference' | 'workshop' | 'talk';
  date: Date;
  description: string;
  imageUrl?: string;
  link?: string;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['hackathon', 'conference', 'workshop', 'talk'], required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  link: { type: String }
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
