import { NextResponse } from 'next/server';
import { initDB, getVisitors, addVisitor, clearVisitors } from '@/lib/data';

export async function GET() {
  try {
    await initDB();
    const visitors = await getVisitors();
    return NextResponse.json(visitors);
  } catch (error) {
    console.error('Visitors GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch visitors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await initDB();
    const body = await request.json();
    await addVisitor(body.ip, body.region, body.country);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Visitors POST error:', error);
    return NextResponse.json({ error: 'Failed to add visitor' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await initDB();
    await clearVisitors();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Visitors DELETE error:', error);
    return NextResponse.json({ error: 'Failed to clear visitors' }, { status: 500 });
  }
}