import { NextRequest, NextResponse } from "next/server";
import { getProjects, saveProjects } from "@/lib/db";

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Error getting projects:", error);
    return NextResponse.json({ error: "Failed to get projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { projects } = await request.json();
    await saveProjects(projects);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving projects:", error);
    return NextResponse.json({ error: "Failed to save projects" }, { status: 500 });
  }
}