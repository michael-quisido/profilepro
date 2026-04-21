import { NextRequest, NextResponse } from "next/server";
import { getAbout, saveAbout } from "@/lib/db";

export async function GET() {
  try {
    const content = await getAbout();
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error getting about:", error);
    return NextResponse.json({ error: "Failed to get about" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();
    await saveAbout(content);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving about:", error);
    return NextResponse.json({ error: "Failed to save about" }, { status: 500 });
  }
}