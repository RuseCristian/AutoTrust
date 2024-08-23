import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { IncomingMessage } from "http";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Base directory for uploads
const baseUploadDir = path.join(process.cwd(), "public", "pdf");

function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function convertRequestToIncomingMessage(request: Request): IncomingMessage {
  const readable = Readable.from(
    request.body as any
  ) as unknown as IncomingMessage;
  readable.headers = Object.fromEntries(request.headers.entries());
  return readable;
}

export async function POST(req: Request) {
  console.log("API route '/api/upload-pdf' has been hit.");

  try {
    const incomingReq = convertRequestToIncomingMessage(req);
    const url = new URL(req.url);
    const type = url.searchParams.get("type");

    if (!type || !["dealership", "service"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid type provided" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(baseUploadDir, type);
    ensureDirectoryExists(uploadDir);

    const form = formidable({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 4 * 1024 * 1024,
      multiples: false,
    });

    const data = await new Promise<{
      fields: formidable.Fields;
      files: formidable.Files;
    }>((resolve, reject) => {
      form.parse(incomingReq, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const file = Array.isArray(data.files.file)
      ? data.files.file[0]
      : data.files.file;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const filePath = file.filepath;
    const fileUrl = `/pdf/${type}/${path.basename(filePath)}`;

    console.log("File uploaded successfully:", fileUrl);
    return NextResponse.json({ fileUrl }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
