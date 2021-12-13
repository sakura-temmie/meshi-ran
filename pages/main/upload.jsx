import Layout from "../../components/layout/Layout";
import React, { useState, useRef, useEffect } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { auth, db } from "../../src/firebase";
import swal from "sweetalert";
import { useRouter } from "next/router";
import Category from "../../components/upload/Category";
import Input from "../../components/upload/Input";
import TextArea from "../../components/upload/TextArea";
import Lanks from "../../components/upload/Lanks";
import Canvas from "../../components/upload/Canvas";

const Upload = () => {
  const router = useRouter();
  const [mov, setMov] = useState(null);
  const [movieUrl, setMovieUrl] = useState("");
  const [datetime, setDatetime] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantArea, setRestaurantArea] = useState("");
  const [restaurantsRef, setRestaurantRef] = useState("");
  const [post_text, setPost_Text] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [lank, setLank] = useState("");
  const inputRef = useRef(null);

  const update = async (e) => {
    e.preventDefault();
    const storage = getStorage();
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const uPhoto = user.photo;
    const movRef = "gs://meshiran-2d6e1.appspot.com/movies/";
    const metadata = {
      contentType: "video/mp4",
    };

    //firebaseでタイムスタンプ型に変換する関数
    const timestamp = (datetimeStr) => {
      return Timestamp.fromDate(new Date(datetimeStr));
    };

    //文字列変換
    const movName = mov.name;
    const movNameLength = movName.length;
    const arrayMovName = [...movName];
    const cutMovName = arrayMovName.splice(0, movNameLength - 3);
    const changeMovName = cutMovName.push("mp4");
    const fixedMovName = cutMovName.join("");
    const fixedMovRef = movRef.concat(fixedMovName);
    console.log(fixedMovRef);
    setMovieUrl(fixedMovRef);

    const storageRef = ref(storage, `movies/${fixedMovName}`);
    const uploadTask = uploadBytesResumable(storageRef, mov, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log("Uploaded a blob or file!");
        swal("投稿完了", "動画がアップロードされました", "success").then(
          (willSearch) => {
            if (willSearch) {
              router.push("/main/upload");
            }
          }
        );
      },
      (error) => {
        swal("投稿未完了", "失敗しました", "error").then((willSearch) => {
          if (willSearch) {
            router.push("/main/upload");
          }
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          try {
            const newPostRef = doc(collection(db, "posts"));
            setDoc(newPostRef, {
              bookmarkedPostDocId: [],
              restaurantName: restaurantName,
              restaurantArea: restaurantArea,
              restaurantsRef: restaurantsRef,
              movieUrl: downloadURL,
              userId: uid,
              // timestamp: timestamp(new Date()),
              likes: [],
              wants: [],
              category: category,
              url: url,
              post_text: post_text,
              lank: lank,
            });
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        });
      }
    );
  };

  const isFileUpload = mov == null;

  // const getImage = () => {
  //   let canvas = document.getElementById("c");
  //   canvas.getContext("2d").drawImage(nameRef2.current, 0, 0, 480, 270);
  // };

  // const uploadImage = () => {
  //   const storage = getStorage();
  //   const storageRef = ref(storage, "movies/01");

  //   // const file = testImage;
  //   // const mFile = testMovie;
  //   console.log(mov);

  //   uploadBytes(storageRef, mov).then((snapshot) => {
  //     console.log("Uploaded a blob or file!");
  //   });
  // };

  const fileUpload = () => {
    console.log(inputRef.current);
    inputRef.current.click();
  };

  return (
    <Layout title="メシラン投稿">
      <form onSubmit={update}>
        <div className="flex items-center justify-center mt-2 px-3">
          {isFileUpload ? (
            <>
              <div>
                <input
                  type="file"
                  accept="video/*"
                  hidden
                  ref={inputRef}
                  onChange={(e) => {
                    setMov(e.target.files[0]);
                  }}
                />
                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  capture="environment"
                  hidden
                />
              </div>
              <div className="flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  onClick={fileUpload}
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>動画をアップロードする</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <Canvas movieRef={mov} />
              {/* <canvas width="130px" height="100px" onChange={getImage} /> */}
              <span className="text-green-400">success！</span>
            </div>
          )}
        </div>
        <div className="flex items-center flex-col mt-4">
          <Input title="店舗名" placeholder="必須" action={setRestaurantName} />
          <Input title="場所" placeholder="必須" action={setRestaurantArea} />
          <Category action={setCategory} />
          <Input title="参考URL" placeholder="任意" action={setUrl} />
          <TextArea action={setPost_Text} />
          <Lanks action={setLank} />
          <div className="mb-4 w-3/4">
            <div className="flex w-full mt-5 justify-between">
              <button
                className="text-lg hover:bg-red-700 text-white font-bold py-2 px-6 rounded w-full"
                style={{ background: "#f00a00" }}
                type="submit"
              >
                投稿する
              </button>
              {/* <button
                className="text-lg hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
                style={{ background: "#f00a00" }}
              >
                下書き保存
              </button> */}
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Upload;
