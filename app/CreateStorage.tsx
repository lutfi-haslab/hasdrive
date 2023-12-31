"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const CreateStorage = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [storageName, setStorageName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    const body = {
      storageName: storageName,
      description: description,
      userId,
    };

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/storage`,
      {
        body: JSON.stringify(body),
        method: "POST",
        headers: {
          Accept: "*/*",
        },
      }
    );

    if (resp) {
      setTimeout(() => {
        router.refresh();
        document.getElementById("closeDialog")?.click();
      }, 2000);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create New Storage</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Storage</DialogTitle>
          <DialogDescription>
            Your storage will be like a folder for your files
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Storage Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e) => setStorageName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              className="col-span-3"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStorage;
