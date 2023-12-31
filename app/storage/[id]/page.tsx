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
import { File, Storage } from "@prisma/client";
import BreadCrumb from "@/components/breadcumbs";
import MyDropzone from "@/components/dropzone";
import TableRowChildren from "./TableRow";

export default async function Storage({ params }: { params: { id: string } }) {
  const user = await currentUser();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/storage?id=${params.id}`
  );
  const data = await response.json();

  return (
    <main className="flex flex-col p-24">
      <div className="flex justify-between w-full">
        <p>{data?.storageName}</p>
        <SignOutButton />
      </div>
      <BreadCrumb
        initial="/"
        title="Storage"
        items={[{ title: "Detail", link: "/dashboard/detail" }]}
      />
      <MyDropzone storageId={params.id} />
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
            {data &&
              data?.file.map((item: File) => <TableRowChildren item={item} />)}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
