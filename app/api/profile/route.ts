import { NextResponse } from 'next/server';
import { getProfile, updateProfile } from '@/lib/data';

export async function GET() {
  const profile = getProfile();
  return NextResponse.json(profile);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const updated = updateProfile(body);
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}