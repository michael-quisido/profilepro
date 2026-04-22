import { NextResponse } from 'next/server';
import { initDB, saveProject } from '@/lib/data';

export async function POST(request: Request) {
  try {
    await initDB();
    const body = await request.json();
    const project = await saveProject(body.title, body.description);
    return NextResponse.json(project);
  } catch (error) {
    console.error('Project POST error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}