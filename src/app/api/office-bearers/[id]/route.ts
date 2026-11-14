import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import OfficeBearer from "@/models/OfficeBearer";
import { revalidateTag } from "next/cache";
import { BEARERS_TAG } from "@/lib/data";
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

    const previous = await OfficeBearer.findById(id).select("imageUrl").lean();
    const updatedBearer = await OfficeBearer.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updatedBearer) return NextResponse.json({ error: "Not found" }, { status: 404 });

    revalidateTag(BEARERS_TAG, "max");
    if (previous?.imageUrl && previous.imageUrl !== updatedBearer.imageUrl) {
      await deleteCloudinaryImageIfUnused(previous.imageUrl);
    }

    return NextResponse.json(updatedBearer);
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

    const deletedBearer = await OfficeBearer.findByIdAndDelete(id);
    if (!deletedBearer) return NextResponse.json({ error: "Not found" }, { status: 404 });

    revalidateTag(BEARERS_TAG, "max");
    await deleteCloudinaryImageIfUnused(deletedBearer.imageUrl);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
