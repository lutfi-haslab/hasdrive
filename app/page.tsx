import { currentUser, SignOutButton } from "@clerk/nextjs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Storage } from "@prisma/client";
import Link from "next/link";
import CreateStorage from "./CreateStorage";


export default async function Home() {
  const user = await currentUser();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user?id=${user?.id}`
  );
  const data = await response.json();

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="flex justify-between w-full">
        <p>Hello! {data?.username}</p>
        <SignOutButton />
      </div>
      <div className="w-full">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Storage</TableHead>
              <TableHead className="text-right">Description</TableHead>
              <TableHead className="text-right">ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <CreateStorage userId={user?.id as string} />
              </TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right"></TableCell>
            </TableRow>
            {data &&
              data?.storage.map((item: Storage) => (
                <TableRow id={item.id}>
                  <TableCell className="font-medium">
                    <Link href={`/storage/${item.id}`}>{item.storageName}</Link>
                  </TableCell>
                  <TableCell className="text-right">
                    {item.description}
                  </TableCell>
                  <TableCell className="text-right">{item.id}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
