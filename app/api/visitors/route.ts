import { NextResponse } from 'next/server';
import { getVisitors, addVisitor } from '@/lib/data';

export async function GET() {
  const visitors = getVisitors();
  return NextResponse.json(visitors);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    addVisitor(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to add visitor' }, { status: 500 });
  }
}