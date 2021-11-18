import React, { useState } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

function App() {
  const [videoSrc, setVideoSrc] = useState("");
  const [newVideoSrc, setNewVideoSrc] = useState("");
  const [message, setMessage] = useState("Click Start to transcode");
  const ffmpeg = createFFmpeg({
    corePath: "./node_modules/@ffmpeg/core/dist/ffmpeg-core.js",
    log: true,
  });

  // async function convertGIF() {
  //   // FFmpegの読み込み
  //   if (!ffmpeg.isLoaded()) {
  //     await ffmpeg.load();
  //   }
  //   const videoName = videoFile[0].name;

  //   // MEMFSへ保存
  //   ffmpeg.FS("writeFile", videoName, await fetchFile(videoFile[0]));

  //   // コマンドの実行
  //   await ffmpeg.run("-i", videoName, "-r", "10", "output.gif");

  //   // MEMFSからファイルを取得
  //   const data = ffmpeg.FS("readFile", "output.gif");

  //   // 変換結果を表示
  //   imagePreview.src = URL.createObjectURL(
  //     new Blob([data.buffer], { type: "image/gif" })
  //   );
  //   imagePreview.style.display = "block";

  //   // データのリンク解除
  //   ffmpeg.FS("unlink", videoName);
  //   ffmpeg.FS("unlink", "output.gif");
  // }

  const doTranscode = async () => {
    // FFmpegの読み込み
    setMessage("Loading ffmpeg-core.js");
    await console.log("---------------1");
    await console.log(videoSrc);
    await ffmpeg.load();
    // MEMFSへ保存
    await console.log("---------------2");
    setMessage("Start transcoding");
    ffmpeg.FS("writeFile", "test.avi", await fetchFile(videoSrc));
    // コマンドの実行
    await console.log("---------------3");
    await ffmpeg.run("-i", "test.avi", "test.mp4");
    setMessage("Complete transcoding");
    // MEMFSからファイルを取得
    await console.log("---------------4");
    const data = ffmpeg.FS("readFile", "test.mp4");
    // setNewVideoSrc(
    //   URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
    // );
    // console.log(newVideoSrc);
  };

  return (
    <div className="App">
      <input
        type="file"
        accept="audio/*,video/*"
        onChange={(e) => {
          setVideoSrc(e.target.value);
        }}
      />
      <br />
      <button onClick={doTranscode}>Start</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
