import { unstable_cache } from "next/cache";
import connectDB from "@/lib/db";
import Event from "@/models/Event";
import OfficeBearer from "@/models/OfficeBearer";

// Cached read helpers. Pages serve from Next's data cache instead of hitting
// MongoDB on every navigation. Admin mutations call revalidateTag() so edits
// still show up immediately; `revalidate` is only a safety net.
export const EVENTS_TAG = "events";
export const BEARERS_TAG = "bearers";
const SAFETY_REVALIDATE = 3600;

const toPlain = <T>(v: T): T => JSON.parse(JSON.stringify(v));

export const getEventsByTypes = unstable_cache(
  async (types: string[]) => {
    await connectDB();
    const query = types.length ? { type: { $in: types } } : {};
    return toPlain(await Event.find(query).sort({ date: -1 }).lean());
  },
  ["events-by-types"],
  { tags: [EVENTS_TAG], revalidate: SAFETY_REVALIDATE }
);

export const getLatestEvents = unstable_cache(
  async (limit: number) => {
    await connectDB();
    return toPlain(await Event.find({}).sort({ date: -1 }).limit(limit).lean());
  },
  ["events-latest"],
  { tags: [EVENTS_TAG], revalidate: SAFETY_REVALIDATE }
);

export const getEventById = unstable_cache(
  async (id: string) => {
    await connectDB();
    const event = await Event.findById(id).lean();
    return event ? toPlain(event) : null;
  },
  ["event-by-id"],
  { tags: [EVENTS_TAG], revalidate: SAFETY_REVALIDATE }
);

export const getBearerYears = unstable_cache(
  async () => {
    await connectDB();
    return (await OfficeBearer.distinct("year")) as string[];
  },
  ["bearer-years"],
  { tags: [BEARERS_TAG], revalidate: SAFETY_REVALIDATE }
);

export const getBearersByYear = unstable_cache(
  async (year: string) => {
    await connectDB();
    return toPlain(await OfficeBearer.find({ year }).sort({ order: 1 }).lean());
  },
  ["bearers-by-year"],
  { tags: [BEARERS_TAG], revalidate: SAFETY_REVALIDATE }
);
