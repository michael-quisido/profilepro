import { NextResponse } from 'next/server';
import { initDB, getCredentials, updateCredentials as saveCredentials } from '@/lib/data';

export async function GET() {
  try {
    await initDB();
    const creds = await getCredentials();
    return NextResponse.json(creds);
  } catch (error) {
    console.error('Credentials GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch credentials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await initDB();
    const body = await request.json();
    await saveCredentials(body.username, body.password, body.verification_email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Credentials POST error:', error);
    return NextResponse.json({ error: 'Failed to update credentials' }, { status: 500 });
  }
}