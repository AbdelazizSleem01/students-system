import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "raw",
            folder: "student-cvs",
            public_id: file.name.replace(/\s+/g, "_").replace(/\.pdf$/i, ""),
            use_filename: true,
            unique_filename: false,
            overwrite: true,
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    const originalUrl = result.secure_url;

    const downloadUrl = originalUrl.replace(
      "/upload/",
      "/upload/fl_attachment/"
    );
    return NextResponse.json({ url: downloadUrl, originalName: file.name });
  } catch (error: any) {
    console.error("PDF Upload Error:", error);
    return NextResponse.json(
      { error: "Failed to upload PDF", details: error.message },
      { status: 500 }
    );
  }
}
