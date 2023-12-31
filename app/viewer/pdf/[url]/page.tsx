// @ts-nocheck
"use client"

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function Viewer({params}: {params: {url: string}}) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    // Ensure the current page number is within the bounds of the new document
    setPageNumber((prevPage) => Math.min(prevPage, numPages));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Document
        file={`https://pub-e9f8e24ea55741c2b8339e9e52d47d05.r2.dev/${params.url}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} scale={1.5} />
      </Document>
      <p style={{ textAlign: 'center' }}>
        <button onClick={handlePrevPage} disabled={pageNumber === 1}>
          Previous
        </button>
        {' | '}
        <button onClick={handleNextPage} disabled={pageNumber === numPages}>
          Next
        </button>
      </p>
      <p style={{ textAlign: 'center' }}>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default Viewer;
