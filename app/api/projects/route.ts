import { NextResponse } from 'next/server';
import { initDB, getProjects, getProject, saveProject, deleteProject } from '@/lib/data';

export async function GET() {
  try {
    await initDB();
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Projects GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}