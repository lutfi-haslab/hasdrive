import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const user = await prisma.user.findUnique({
      where: {
        id: String(id),
      },
      include: {
        storage: true
      }
    });
    return Response.json(user);
  } else {
    const users = await prisma.user.findMany({
      include: {
        storage: {
          include: {
            file: true
          }
        }
      }
    });
    return Response.json(users);
  }
}

export async function POST(req: Request) {
  const res = await req.json();

  const user = await prisma.user.create({
    data: {
      username: res.username,
    }
  });

  return Response.json(user);
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const res = await req.json();

  const user = await prisma.user.update({
    where: {
      id: String(id),
    },
    data: {
      username: res.username,
    },
  });

  return Response.json(user);
}
