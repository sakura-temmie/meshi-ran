import Layout from "../../components/layout/Layout";
import React, { useState, useRef } from "react";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import testImage from "../../public/image.jpeg";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { auth, db } from "../../src/firebase";
import swal from "sweetalert";
import { useRouter } from "next/router";

const Upload = () => {
  const router = useRouter();

  const [mov, setMov] = useState("");

  const [state, setState] = useState();
  const [store, setStore] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [url, setUrl] = useState("");
  const [comments, setComments] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [lank, setLank] = useState("");
  const inputRef = useRef(null);

  const update = async (e) => {
    e.preventDefault();
    console.log(store, area, category, url, comments, lank, evaluation);

    const storage = getStorage();
    const movName = mov.name;
    console.log(movName);
    const storageRef = ref(storage, `movies/${movName}`);
    console.log(mov);
    console.log("1=======================");
    uploadBytes(storageRef, mov).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      swal("投稿完了", "動画がアップロードされました", "success").then(
        (willSearch) => {
          if (willSearch) {
            router.push("/main");
          }
        }
      );

      // alert("アップデートが完了しました");
    });

    const userId = auth.currentUser.uid;
    console.log("3=======================");

    try {
      const docRef = await setDoc(doc(db, "users", userId), {
        store: store,
        area: area,
        category: category,
        url: url,
        comments: comments,
        evaluation: evaluation,
        lank: lank,
      }).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      });
      console.log("4=======================");
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const categories = [
    { value: "", label: "▼ ジャンルを選択してください" },
    {
      value: "1",
      label: "焼肉",
    },
    {
      value: "2",
      label: "寿司",
    },
    {
      value: "3",
      label: "和食",
    },
    {
      value: "4",
      label: "イタリアン",
    },
    {
      value: "5",
      label: "焼き鳥",
    },
    {
      value: "6",
      label: "中華",
    },
    {
      value: "7",
      label: "ラーメン",
    },
    {
      value: "8",
      label: "B級",
    },
    {
      value: "9",
      label: "韓国料理",
    },
    {
      value: "10",
      label: "フレンチ",
    },
    {
      value: "11",
      label: "エスニック",
    },
    {
      value: "12",
      label: "カレー",
    },
    {
      value: "13",
      label: "ハンバーガー",
    },
    {
      value: "14",
      label: "海鮮系",
    },
    {
      value: "15",
      label: "メキシカン",
    },
    {
      value: "16",
      label: "スペイン",
    },
    {
      value: "17",
      label: "ステーキ",
    },
    {
      value: "18",
      label: "アフリカ",
    },
    {
      value: "19",
      label: "ビーガン",
    },
    {
      value: "20",
      label: "肉料理",
    },
    {
      value: "21",
      label: "鍋",
    },
    {
      value: "22",
      label: "おでん",
    },
    {
      value: "23",
      label: "洋食",
    },
    {
      value: "24",
      label: "麺類",
    },
    {
      value: "25",
      label: "天ぷら",
    },
    {
      value: "26",
      label: "日本酒",
    },
    {
      value: "27",
      label: "ワイン",
    },
    {
      value: "28",
      label: "ピザ",
    },
    {
      value: "29",
      label: "カフェ",
    },
    {
      value: "30",
      label: "BAR",
    },
    {
      value: "31",
      label: "パン",
    },
    {
      value: "32",
      label: "スイーツ",
    },
    {
      value: "33",
      label: "その他",
    },
  ];

  // const inputArea = [
  //   { value: "", label: "▼エリアを選択してください" },
  //   { value: "1", label: "銀座・有楽町・築地" },
  //   { value: "2", label: "新橋・浜松町・田町" },
  // ];

  const evals = [
    { value: "1", label: "リピート確定" },
    { value: "2", label: "また行きたい" },
    { value: "3", label: "まあまあ・普通" },
    { value: "4", label: "多分行かない" },
    { value: "5", label: "2度と行かない" },
  ];

  const lanks = [
    { value: "1", label: "★★★★★" },
    { value: "2", label: "★★★★☆" },
    { value: "3", label: "★★★☆☆" },
    { value: "4", label: "★★☆☆☆" },
    { value: "5", label: "★☆☆☆☆" },
    { value: "6", label: "☆☆☆☆☆" },
  ];

  const uploadImage = () => {
    const storage = getStorage();
    const storageRef = ref(storage, "movies/01");

    // const file = testImage;
    // const mFile = testMovie;
    console.log(mov);

    uploadBytes(storageRef, mov).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  const fileUpload = () => {
    console.log(inputRef.current);
    inputRef.current.click();
  };

  return (
    <Layout title="メシラン投稿">
      <form onSubmit={update}>
        <div className="flex items-center justify-between mt-2 px-3">
          <div
            className="w-20 h-20 text-center align-middle pt-5 text-white text-bold"
            style={{ background: "#f00a00" }}
          >
            動画を
            <br />
            アップ
          </div>
          <div>
            {/* <button onClick={uploadImage}>upload</button> */}
            <input
              type="file"
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
              // ref={inputRef}
              // onChange={(e) => {
              //   setMov(e.target.files[0]);
              // }}
            />
          </div>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg> */}
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
        </div>
        <div className="flex items-center flex-col mt-4">
          <div
            className="mb-2 w-3/4 py-2 flex"
            style={{ borderBottom: "solid #f00a00 1px" }}
          >
            <p className="appearance-none border-none text-red-700 mr-3 py-1 px-2 focus:outline-none">
              店舗名
            </p>
            <input
              className="appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="必須"
              style={{ fontSize: "16px" }}
              onChange={(e) => setStore(e.target.value)}
            />
          </div>
          <div
            className="mb-2 w-3/4 py-2 flex"
            style={{ borderBottom: "solid #f00a00 1px" }}
          >
            <p className="appearance-none border-none text-red-700 mr-3 py-1 px-2 focus:outline-none">
              場所
            </p>
            <input
              className="appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="必須"
              style={{ fontSize: "16px" }}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <div
            className="mb-2 w-3/4 py-2 flex"
            style={{ borderBottom: "solid #f00a00 1px" }}
          >
            <p className="appearance-none border-none text-red-700 mr-3 py-1 px-2 focus:outline-none">
              ジャンル
            </p>
            <select
              className="appearance-none border-none mr-3 py-1 px-2 focus:outline-none bg-white"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
          <div
            className="mb-4 w-3/4 py-2 flex"
            style={{ borderBottom: "solid #f00a00 1px" }}
          >
            <p className="appearance-none border-none text-red-700 mr-3 py-1 px-2 focus:outline-none">
              参考URL
            </p>
            <input
              className="appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              placeholder="任意"
              style={{ fontSize: "16px" }}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="mb-4 w-3/4">
            <textarea
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="6"
              style={{ border: "solid #f00a00 1px", fontSize: "16px" }}
              placeholder="コメント(150字以内)"
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
          <div className="w-3/4 flex align-center items-center">
            <p className="text-lg">評価：</p>
            <select
              className="appearance-none border-none bg-white text-red-700 mr-3 py-1 px-2 text-xl focus:outline-none"
              onChange={(e) => setEvaluation(e.target.value)}
            >
              {evals.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 w-3/4">
            <select
              className="appearance-none border-none text-yellow-600 bg-white text-5xl focus:outline-none"
              onChange={(e) => setLank(e.target.value)}
            >
              {lanks.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
            {/* <p className="">★★★★☆</p> */}
          </div>
          <div className="mb-4 w-3/4">
            {/* <!-- Toggle --> */}
            {/* <div className="flex w-full">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" id="toggleB" className="sr-only" />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
              </div>
              <div className="ml-3 text-gray-700 font-medium">Facebook</div>
            </label>
          </div>
          <div className="flex w-full mt-2">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" id="toggleB" className="sr-only" />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
              </div>
              <div className="ml-3 text-gray-700 font-medium">Twitter</div>
            </label>
          </div> */}
            <div className="flex w-full mt-5 justify-between">
              <button
                className="text-lg hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
                style={{ background: "#f00a00" }}
                type="submit"
              >
                投稿する
              </button>
              <button
                className="text-lg hover:bg-red-700 text-white font-bold py-2 px-6 rounded"
                style={{ background: "#f00a00" }}
              >
                下書き保存
              </button>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Upload;
