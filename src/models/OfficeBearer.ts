import mongoose from "mongoose";

export interface IOfficeBearer extends mongoose.Document {
  name: string;
  role: string;
  year: string;
  imageUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const OfficeBearerSchema = new mongoose.Schema<IOfficeBearer>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this office bearer."],
      maxlength: [60, "Name cannot be more than 60 characters"],
    },
    role: {
      type: String,
      required: [true, "Please provide a role (e.g., Chairperson)"],
    },
    year: {
      type: String,
      required: [true, "Please provide the academic year (e.g., 2024-2025)"],
      index: true,
    },
    imageUrl: {
      type: String,
    },
    linkedinUrl: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    order: {
      type: Number,
      default: 100, // Lower numbers appear first
    },
  },
  {
    timestamps: true,
  }
);

OfficeBearerSchema.index({ year: -1, order: 1 });

export default mongoose.models.OfficeBearer || mongoose.model<IOfficeBearer>("OfficeBearer", OfficeBearerSchema);
