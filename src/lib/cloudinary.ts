import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/db";
import Event from "@/models/Event";
import OfficeBearer from "@/models/OfficeBearer";

cloudinary.config();

// https://res.cloudinary.com/<cloud>/image/upload/v123/folder/name.jpg -> "folder/name"
function publicIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname !== "res.cloudinary.com") return null;
    const idx = u.pathname.indexOf("/upload/");
    if (idx === -1) return null;
    let rest = decodeURIComponent(u.pathname.slice(idx + "/upload/".length));
    rest = rest.replace(/^v\d+\//, "");
    return rest.replace(/\.[^./]+$/, "") || null;
  } catch {
    return null;
  }
}

/**
 * Delete a replaced/removed image from Cloudinary. Safe to call with any value:
 * non-Cloudinary URLs are ignored, and the asset is kept if any other event or
 * office bearer still uses the same URL (e.g. a photo reused across years).
 * Never throws; a failed cleanup must not fail the admin's save.
 */
export async function deleteCloudinaryImageIfUnused(url?: string | null) {
  if (!url) return;
  const publicId = publicIdFromUrl(url);
  if (!publicId) return;
  try {
    await connectDB();
    const [events, bearers] = await Promise.all([
      Event.countDocuments({ imageUrl: url }),
      OfficeBearer.countDocuments({ imageUrl: url }),
    ]);
    if (events + bearers > 0) return;
    await cloudinary.uploader.destroy(publicId, { invalidate: true });
  } catch (error) {
    console.error("Cloudinary cleanup failed for", url, error);
  }
}
