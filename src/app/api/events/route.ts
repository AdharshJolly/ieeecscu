import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Event from '@/models/Event';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export const dynamic = 'force-dynamic'

export async function GET() {
  await connectDB();
  const events = await Event.find({}).sort({ date: -1 });
  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    await connectDB();
    const event = await Event.create(body);
    return NextResponse.json(event);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
