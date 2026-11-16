import { unstable_cache } from "next/cache";
import connectDB from "@/lib/db";
import Event from "@/models/Event";
import OfficeBearer from "@/models/OfficeBearer";
import { FALLBACK_EVENTS, FALLBACK_YEARS, FALLBACK_BEARERS } from "@/lib/fallback-data";

// Cached read helpers. Pages serve from Next's data cache instead of hitting
// MongoDB on every navigation. Admin mutations call revalidateTag() so edits
// still show up immediately; `revalidate` is only a safety net.
export const EVENTS_TAG = "events";
export const BEARERS_TAG = "bearers";
const SAFETY_REVALIDATE = 3600;

const toPlain = <T>(v: T): T => JSON.parse(JSON.stringify(v));

export const getEventsByTypes = unstable_cache(
  async (types: string[]) => {
    try {
      await connectDB();
      const query = types.length ? { type: { $in: types } } : {};
      const dbEvents = toPlain(await Event.find(query).sort({ date: -1 }).lean());
      if (dbEvents && dbEvents.length > 0) {
        return dbEvents;
      }
    } catch (error) {
      console.warn("Could not fetch events from database, using fallback:", error);
    }

    // Fallback engages strictly when DB is empty or unreachable (e.g. local dev without credentials)
    if (!types.length) return FALLBACK_EVENTS;
    return FALLBACK_EVENTS.filter((e) => types.includes(e.type));
  },
  ["events-by-types"],
  { tags: [EVENTS_TAG], revalidate: SAFETY_REVALIDATE }
);

export const getLatestEvents = unstable_cache(
  async (limit: number) => {
    try {
      await connectDB();
      const dbEvents = toPlain(await Event.find({}).sort({ date: -1 }).limit(limit).lean());
      if (dbEvents && dbEvents.length > 0) {
        return dbEvents;
      }
    } catch (error) {
      console.warn("Could not fetch latest events from database, using fallback:", error);
    }

    return FALLBACK_EVENTS.slice(0, limit);
  },
  ["events-latest"],
  { tags: [EVENTS_TAG], revalidate: SAFETY_REVALIDATE }
);

export const getEventById = unstable_cache(
  async (id: string) => {
    try {
      await connectDB();
      const event = await Event.findById(id).lean();
      if (event) return toPlain(event);
    } catch (error) {
      console.warn(`Could not fetch event by id ${id} from database, using fallback:`, error);
    }

    return FALLBACK_EVENTS.find((e) => e._id === id) || null;
  },
  ["event-by-id"],
  { tags: [EVENTS_TAG], revalidate: SAFETY_REVALIDATE }
);

export const getBearerYears = unstable_cache(
  async () => {
    try {
      await connectDB();
      const dbYears = (await OfficeBearer.distinct("year")) as string[];
      if (dbYears && dbYears.length > 0) {
        return dbYears.sort((a, b) => b.localeCompare(a));
      }
    } catch (error) {
      console.warn("Could not fetch bearer years from database, using fallback:", error);
    }

    return FALLBACK_YEARS;
  },
  ["bearer-years"],
  { tags: [BEARERS_TAG], revalidate: SAFETY_REVALIDATE }
);

export const getBearersByYear = unstable_cache(
  async (year: string) => {
    try {
      await connectDB();
      const dbBearers = toPlain(await OfficeBearer.find({ year }).sort({ order: 1 }).lean());
      if (dbBearers && dbBearers.length > 0) {
        return dbBearers;
      }
    } catch (error) {
      console.warn(`Could not fetch bearers for year ${year} from database, using fallback:`, error);
    }

    return FALLBACK_BEARERS[year] || [];
  },
  ["bearers-by-year"],
  { tags: [BEARERS_TAG], revalidate: SAFETY_REVALIDATE }
);
