import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import OfficeBearer from "@/models/OfficeBearer";

export async function GET() {
  try {
    await connectDB();
    const allYears = await OfficeBearer.distinct("year");
    return NextResponse.json(allYears);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
