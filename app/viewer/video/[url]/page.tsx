"use client";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const VideoPlayer = ({ params }: { params: { url: string } }) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player flex justify-center items-center h-screen"
          url={`https://pub-e9f8e24ea55741c2b8339e9e52d47d05.r2.dev/${params?.url}`}
          width="100%"
          height="100%"
          playing={true}
          onError={() => {
            console.log("Something went wroung...");
          }}
          controls={true}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
