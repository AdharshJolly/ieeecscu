import { NextResponse } from 'next/server';
import { uploadImageToGithub, deleteImageFromGithub, listImagesFromGithub } from '@/lib/github';
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse('Unauthorized', { status: 401 });

  try {
    const images = await listImagesFromGithub();
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error listing images:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse('Unauthorized', { status: 401 });

  try {
    const { filename, base64 } = await req.json();
    if (!filename || !base64) {
      return new NextResponse('Bad Request', { status: 400 });
    }
    
    // Extract actual base64 content if it includes data URI prefix
    const base64Content = base64.includes(',') ? base64.split(',')[1] : base64;
    
    const url = await uploadImageToGithub(filename, base64Content);
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error uploading image:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new NextResponse('Unauthorized', { status: 401 });

  try {
    const { filename } = await req.json();
    if (!filename) {
      return new NextResponse('Bad Request', { status: 400 });
    }
    await deleteImageFromGithub(filename);
    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Error deleting image:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
