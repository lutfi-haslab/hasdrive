import { prisma } from "@/lib/prisma";
import type { WebhookEvent } from "@clerk/clerk-sdk-node";

export async function POST(req: Request) {
  const res = (await req.json()) as WebhookEvent;
  switch (res.type) {
    case "user.created":
      const user = await prisma.user.upsert({
        create: {
          id: res.data.id,
          username: res.data.username ?? "",
        },
        update: {
          username: res.data.username ?? "",
        },
        where: {
          id: res.data.id,
        },
      });

      return Response.json(user);
  }
}
