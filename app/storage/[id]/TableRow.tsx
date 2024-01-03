"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { File } from "@prisma/client";
import React from "react";
import { useRouter } from "next/navigation";
import { Delete, Download, DownloadCloud } from "lucide-react";
import axios, { AxiosResponse } from "axios";

const TableRowChildren = ({ item }: { item: File }) => {
  const router = useRouter();
  const handleView = () => {
    if (item.ContentType === "application/pdf") {
      // router.push(`/viewer/pdf/${item.urlPath}`);
      window.open(
        `/viewer/pdf/${item.urlPath}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else if (item.ContentType === "video/mp4") {
      window.open(
        `/viewer/video/${item.urlPath}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const handleDelete = async () => {
    const response: AxiosResponse = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/file?id=${item.id}`
    );

    if (response) {
      window.location.reload();
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
      <TableCell className="text-center">
        <a
          className="hover:text-blue-600"
          href={`https://pub-e9f8e24ea55741c2b8339e9e52d47d05.r2.dev/${item.urlPath}`}
          target="_blank"
          download
        >
          <DownloadCloud size={26} />
        </a>
      </TableCell>
      <TableCell className="text-right">
        <Delete
          size={26}
          className="hover:text-red-600"
          onClick={handleDelete}
        />
      </TableCell>
    </TableRow>
  );
};

export default TableRowChildren;
