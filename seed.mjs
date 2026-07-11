import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env.local');
  process.exit(1);
}

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String },
  imageUrl: { type: String },
});

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  
  console.log('Connected to DB. Clearing existing events...');
  await Event.deleteMany({});
  
  const events = [
    {
      title: "Explore and Evolve 2025",
      type: "hackathon",
      date: "September 2 - September 15, 2025",
      description: "Join us for Explore and Evolve 2025, our flagship hackathon event.",
      link: "/explore-and-evolve/index.html",
      imageUrl: "/assets/explore-and-evolve.png"
    },
    {
      title: "ADCIS 2025",
      type: "conference",
      date: "September 15 - 16, 2025",
      description: "Annual International Conference on Data Science and Intelligent Systems.",
      link: "https://scrs.in/conference/adcis2025",
      imageUrl: "/assets/adcis.png"
    }
  ];
  
  await Event.insertMany(events);
  console.log('Successfully seeded database with original events!');
  process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
