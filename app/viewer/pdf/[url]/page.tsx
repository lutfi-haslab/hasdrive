"use client";
import {
  ProgressBar,
  ScrollMode,
  SpecialZoomLevel,
  ViewMode,
  Viewer,
  Worker,
} from "@react-pdf-viewer/core";
import {
  ToolbarProps,
  ToolbarSlot,
  defaultLayoutPlugin,
} from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import { ReactElement } from "react";

const PdfViewer = ({ params }: { params: { url: string } }) => {
  const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
    <>
      <Toolbar>
        {(props: ToolbarSlot) => {
          const {
            CurrentPageInput,
            Download,
            EnterFullScreen,
            GoToNextPage,
            GoToPreviousPage,
            NumberOfPages,
            Print,
            ShowSearchPopover,
            Zoom,
            ZoomIn,
            ZoomOut,
            ShowProperties,
            SwitchViewMode,
            SwitchScrollMode
          } = props;
          return (
            <>
              <div style={{ padding: "0px 2px" }}>
                <ShowSearchPopover />
              </div>
              <div style={{ padding: "0px 2px" }}>
                <ZoomOut />
              </div>
              <div style={{ padding: "0px 2px" }}>
                <Zoom />
              </div>
              <div style={{ padding: "0px 2px" }}>
                <ZoomIn />
              </div>
              <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
                <GoToPreviousPage />
              </div>
              <div style={{ padding: "0px 2px", width: "4rem" }}>
                <CurrentPageInput />
              </div>
              <div style={{ padding: "0px 2px" }}>
                / <NumberOfPages />
              </div>
              <div style={{ padding: "0px 2px" }}>
                <GoToNextPage />
              </div>
              <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
                <EnterFullScreen />
              </div>
              <div style={{ padding: "0px 2px" }}>
                <Download />
              </div>
              <div style={{ padding: "0px 2px" }}>
                <Print />
              </div>
              <div style={{ padding: "0px 2px" }}>
                <SwitchViewMode mode={ViewMode.SinglePage} />
              </div>
              <div style={{ padding: "0px 2px" }}>
                <SwitchViewMode mode={ViewMode.DualPage} />
              </div>
            </>
          );
        }}
      </Toolbar>
      {/* <div
        style={{
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          marginTop: "4px",
          padding: "4px",
        }}
      >
        Custom element
      </div> */}
    </>
  );

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: (defaultTabs) => [
      // Remove the attachments tab (\`defaultTabs[2]\`)
      defaultTabs[0], // Bookmarks tab
      defaultTabs[1], // Thumbnails tab
    ],
  });
  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div className="border-2">
        <Viewer
          fileUrl={`https://pub-e9f8e24ea55741c2b8339e9e52d47d05.r2.dev/${params.url}`}
          renderLoader={(percentages: number) => (
            <div style={{ width: "240px" }}>
              <ProgressBar progress={Math.round(percentages)} />
            </div>
          )}
          viewMode={ViewMode.SinglePage}
          defaultScale={SpecialZoomLevel.ActualSize}
          plugins={[defaultLayoutPluginInstance]}
        />
      </div>
    </Worker>
  );
};

export default PdfViewer;
