import { NextRequest, NextResponse } from "next/server";
import { writeFile, readdir, unlink } from "fs/promises";
import { join } from "path";

const IMAGES_DIR = join(process.cwd(), "public", "images");

export async function GET() {
  try {
    const files = await readdir(IMAGES_DIR);
    const images = await Promise.all(
      files
        .filter((file) => /\.(jpg|jpeg|png|gif|webp|svg|ico)$/i.test(file))
        .map(async (file) => {
          const { stat } = await import("fs/promises");
          const fileStat = await stat(join(IMAGES_DIR, file));
          return {
            name: file,
            url: `/images/${file}`,
            size: fileStat.size,
          };
        })
    );
    return NextResponse.json({ images });
  } catch (error) {
    console.error("Error reading images:", error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      await writeFile(join(IMAGES_DIR, filename), buffer);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error uploading:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("file");

    if (!filename) {
      return NextResponse.json({ error: "Filename required" }, { status: 400 });
    }

    const filepath = join(IMAGES_DIR, filename);
    await unlink(filepath);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
