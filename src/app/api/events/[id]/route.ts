import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Event from "@/models/Event";
import { revalidateTag } from "next/cache";
import { EVENTS_TAG } from "@/lib/data";
import { deleteCloudinaryImageIfUnused } from "@/lib/cloudinary";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    await connectDB();

    const previous = await Event.findById(id).select("imageUrl").lean();
    const updatedEvent = await Event.findByIdAndUpdate(id, body, { new: true });
    if (!updatedEvent) return NextResponse.json({ error: "Not found" }, { status: 404 });

    revalidateTag(EVENTS_TAG, "max");
    if (previous?.imageUrl && previous.imageUrl !== updatedEvent.imageUrl) {
      await deleteCloudinaryImageIfUnused(previous.imageUrl);
    }

    return NextResponse.json(updatedEvent);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();

    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) return NextResponse.json({ error: "Not found" }, { status: 404 });

    revalidateTag(EVENTS_TAG, "max");
    await deleteCloudinaryImageIfUnused(deletedEvent.imageUrl);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
