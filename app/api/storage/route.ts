import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const storage = await prisma.storage.findUnique({
      where: {
        id: String(id),
      },
    });
    return Response.json(storage);
  } else {
    const storages = await prisma.storage.findMany();
    return Response.json(storages);
  }
}

export async function POST(req: Request) {
  const res = await req.json();

  const storage = await prisma.storage.create({
    data: {
      storageName: res.storageName,
      description: res?.description,
      userId: res.userId,
    },
  });

  return Response.json(storage);
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const res = await req.json();

  const storage = await prisma.storage.update({
    where: {
      id: String(id),
    },
    data: {
        storageName: res?.storageName,
        description: res?.description,
        userId: res?.userId,
      },
  });

  return Response.json(storage);
}
