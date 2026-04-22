import { NextResponse } from 'next/server';
import { initDB, getProfile, updateProfile } from '@/lib/data';

export async function GET() {
  try {
    await initDB();
    const profile = await getProfile();
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await initDB();
    const body = await request.json();
    const updated = await updateProfile(body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Profile POST error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}