"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { File } from "@prisma/client";
import React from "react";
import { useRouter } from "next/navigation";

const TableRowChildren = ({ item }: { item: File }) => {
  const router = useRouter();
  const handleView = () => {
    if (item.ContentType === "application/pdf") {
      router.push(`/viewer/pdf/${item.urlPath}`);
    } else if (item.ContentType === "video/mp4") {
      router.push(`/viewer/video/${item.urlPath}`);
    }
  };
  return (
    <TableRow id={item.id}>
      <TableCell className="font-medium">
        <button id={item.id} onClick={handleView}>
          {item.name}
        </button>
      </TableCell>
      <TableCell className="text-right">{item.urlPath}</TableCell>
      <TableCell className="text-right">{item.id}</TableCell>
    </TableRow>
  );
};

export default TableRowChildren;
