import { useRef, useEffect } from "react";
import Image from "next/image";

//Canvasというreactコンポーネントにラップされたcanvas要素作成
const Canvas = ({ movieRef }) => {
  // const canvasRef = useRef(null);

  useEffect(() => {
    //inputタグで取得したFile objectを変数に入れる
    const file = movieRef;
    // console.log(file);

    // FileReaderオブジェクトを使ってファイル読み込み
    let reader = new FileReader();


    reader.onload = function (e) {
      // 読み込みが完了した後の処理

      // console.log(e);
      const cameraSize = { w: 100, h: 100 };
      // const canvasSize = { w: 0, h: 0 };
      let canvas;
      let video;
      let source;
      // let img;

      // video要素をつくる
      video = document.createElement("video");
      video.id = "video";
      video.width = cameraSize.w;
      video.height = cameraSize.h;
      document.getElementById("videoPreview").appendChild(video);

      //source要素をつくる
      source = document.createElement("source");
      source.id = "source";
      source.type = "video/mp4";
      document.getElementById("video").appendChild(source);

      // canvas要素をつくる
      canvas = document.createElement("canvas");
      canvas.id = "canvas";
      // canvas.width = canvasSize.w;
      // canvas.height = canvasSize.h;

      //img要素を作る
      // img = document.createElement("img");
      // img.id = "myImage";
      // document.getElementById("canvasPreview").appendChild(img);

      const video1 = document.getElementById("video");
      const source1 = document.getElementById("source");
      // const img1 = document.getElementById("myImage");

      source1.src = e.target.result;
      //↑ e.target.resultはreadAsDataURL()でとってきたFileオブジェクトのData URI
      const canvas2 = document.createElement("canvas");
      const canvasCtx = canvas2.getContext("2d");
      // console.log(video1);
      canvasCtx.drawImage(video1, 0, 0, 360, 240);

      // 描画したcanvasから画像を作る
      // const d = canvas2.toDataURL("image/jpeg");
      // 画像のソースにcanvasから取得した情報を渡す
      // img1.src = d;
    };


    reader.readAsDataURL(file);

    // const fileUrl2 = URL.revokeObjectURL(fileUrl)
    // console.log(fileUrl2);
    // reader.readAsDataURL(fileUrl);
  }, []);

  return (
    <>
      <div id="videoPreview" className="overflow-hidden">
        {/* <p>video preview</p> */}
      </div>
      <div id="canvasPreview">{/* <img id="myImage" src="" alt="" /> */}</div>
      {/* <canvas ref={canvasRef} {...rest} />
      <img ref="image" src="" />*/}
    </>
  );
};

export default Canvas;

//めも
//refを介してキャンバスを取得しようとしたとき、コンポーネントはまだマウントされていないため、
//その値は指定した初期値（この場合はnull）。
//実際のキャンバスを取得する前に、コンポーネントが正しくマウントされるのを待つ必要がある。
//useEffectは、機能部品における副作用(関数)を実行することができ、
//コンポーネントのマウント、コンポーネントの更新または変数の変更などの直後に関数を呼び出すことができる

//domでcanvas要素が利用可能になった直後に、
//javascriptで取得して、そのコンテキストを取得し、描画を行う必要がある。
//これを行うには、useEffectの最初の引数として実行される関数を渡し、
//2番目の引数として空の配列を渡す。空の配列は、コンポーネントがマウントされた後、
//その関数を1回だけ実行することをuseEffectに指示する。
//最初の引数（関数）のみを渡すと、useEffectは、コンポーネントを更新するたびに関数を呼び出します。
