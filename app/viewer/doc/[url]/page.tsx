"use client";

import { useState } from "react";

const DocViewer = () => {
  const docs = [
    { uri: "https://pub-e9f8e24ea55741c2b8339e9e52d47d05.r2.dev/1703996738973-route.ts" }, // Remote file
  ];

  return (
    <>
      <DocViewer
        //   @ts-ignore
        documents={docs}
      />
    </>
  );
};

export default DocViewer;
