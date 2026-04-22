import { NextResponse } from 'next/server';
import { initDB, getContact, updateContact } from '@/lib/data';

export async function GET() {
  try {
    await initDB();
    const content = await getContact();
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Contact GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch contact' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await initDB();
    const body = await request.json();
    await updateContact(body.content);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact POST error:', error);
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
  }
}