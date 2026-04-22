import { NextResponse } from 'next/server';
import { initDB, getAbout, updateAbout } from '@/lib/data';

export async function GET() {
  try {
    await initDB();
    const content = await getAbout();
    return NextResponse.json({ content });
  } catch (error) {
    console.error('About GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch about' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await initDB();
    const body = await request.json();
    await updateAbout(body.content);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('About POST error:', error);
    return NextResponse.json({ error: 'Failed to update about' }, { status: 500 });
  }
}