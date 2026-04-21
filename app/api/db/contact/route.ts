import { NextRequest, NextResponse } from "next/server";
import { getContact, saveContact } from "@/lib/db";

export async function GET() {
  try {
    const content = await getContact();
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error getting contact:", error);
    return NextResponse.json({ error: "Failed to get contact" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json();
    await saveContact(content);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json({ error: "Failed to save contact" }, { status: 500 });
  }
}