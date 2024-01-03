"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios, { AxiosResponse } from "axios";

function MyDropzone({ storageId }: { storageId: string }) {
  const [progress, setProgress] = useState(0);
  const onDrop = useCallback(async (acceptedFiles: any[]) => {
    acceptedFiles.forEach(async (file: Blob) => {
      const body = new FormData();
      body.append("file", file);
      body.append("storageId", storageId);

      const headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      };

      const response: AxiosResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/file`,
        body,
        {
          headers: headersList,
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent?.total!
            );
            setProgress(percentage);
            console.log(`Upload progress: ${percentage}%`);
          },
        }
      );

      if (response) {
        window.location.reload();
      }
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className="flex items-center justify-center w-full"
      {...getRootProps()}
    >
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
          {progress > 0 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Upload progress: {progress}%
            </p>
          )}
        </div>
      </label>
      <input {...getInputProps()} />
    </div>
  );
}

export default MyDropzone;
