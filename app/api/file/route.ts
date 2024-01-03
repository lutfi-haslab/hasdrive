import { prisma } from "@/lib/prisma";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_REGION as string,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY as string,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY as string,
  },
  endpoint: process.env.NEXT_PUBLIC_ENDPOINT,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const file = await prisma.file.findUnique({
      where: {
        id: String(id),
      },
    });
    return Response.json(file);
  } else {
    const files = await prisma.file.findMany();
    return Response.json(files);
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    console.log(formData);
    const file = formData.get("file") as File | null;
    console.log(file);
    const storageId = formData.get("storageId") as string;
    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      );
    }

    const mimeType = file.type;
    const fileExtension = mimeType.split("/")[1];

    const buffer = Buffer.from(await file.arrayBuffer());
    const urlKeyPath = `${Date.now()}-${file.name}`;

    const params = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME as string,
      Key: urlKeyPath,
      Body: buffer,
      ContentType: file.type,
    };

    const command = new PutObjectCommand(params);
    const resp = await s3Client.send(command);
    if (resp) {
      const resFile = await prisma.file.create({
        data: {
          name: file.name,
          ContentType: file.type,
          urlPath: urlKeyPath,
          size: file.size,
          storageId,
        },
      });

      return Response.json(resFile);
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ message: "Error uploading image" });
  }
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const res = await req.json();

  const file = await prisma.file.update({
    where: {
      id: String(id),
    },
    data: {
      name: res?.name,
      ContentType: res?.contentType,
      urlPath: res?.urlPath,
      size: res?.size,
      storageId: res?.storageId,
    },
  });

  return Response.json(file);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const file = await prisma.file.delete({
    where: {
      id: String(id),
    },
  });

  return Response.json(file);
}
