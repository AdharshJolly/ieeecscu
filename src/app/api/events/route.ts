import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import Event from "@/models/Event";
import { revalidateTag } from "next/cache";
import { EVENTS_TAG } from "@/lib/data";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find({}).sort({ date: -1 }).lean();
    return NextResponse.json(events);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    const newEvent = new Event(body);
    await newEvent.save();
    revalidateTag(EVENTS_TAG, "max");

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
