// import movie from "../../public/kz3zu-jc3v1.mp4";
import icon from "../../public/img01.jpg";
import icon2 from "../../public/pngn.jpg";
import icon3 from "../../public/001.png";
import icon4 from "../../public/002.png";
import Image from "next/image";
import Layout from "../../components/layout/Layout";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";

export default function MainIndex() {
  const getUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;
      console.log(displayName, email, photoURL, emailVerified, uid);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getUser();
    }
  }, []);

  return (
    <Layout title="みんなの投稿">
      <div className="fullPageScroll">
        <section id="section1" className="section section1 relative">
          <div className="relative text-white">
            <div className="absolute p-1 w-full bg-gray-900 bg-opacity-50">
              <div className="flex items-center justify-start px-2">
                <Image
                  src={icon2}
                  alt=""
                  className="object-cover rounded-full flex items-center justify-center"
                  width="60"
                  height="60"
                />
                <div className="pl-2 flex flex-col">
                  <p className="font-bold font-lg">山田花子</p>
                  <div className="flex">
                    <button
                      className="hover:bg-yellow-700 font-bold p-1 text-xs rounded mt-2"
                      style={{ color: "#f00a00", border: "2px solid #f00a00" }}
                    >
                      フォローする
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center ml-2">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-500 mr-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 ml-5"
                      style={{ color: "#f00a00" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs pt-2">
                    30いいね 14いきたい 3コメント
                  </p>
                  <div className="flex items-center justify-center">
                    <p>評価：また行きたい</p>
                    <p className="pl-1 text-xl" style={{ color: "#f00a00" }}>
                      ★★★★☆
                    </p>
                  </div>
                </div>
              </div>
              <p className="w-full text-xs">@原宿　ビーガンじゃんがら</p>
              <p className="w-full p-2">
                鉄板まま出てくるので、熱々の状態で食べることができます。
                ビーガンミートで、体にもよく、オススメです！
              </p>
            </div>
            <div>
              <video
                autoPlay
                className="overflow-hidden"
                width="414"
                height="10"
                muted
                playsInline
                objectfit="true"
                loop
                src={require("../../public/kz3zu-jc3v1.mp4")}
              ></video>
            </div>
          </div>
        </section>
        <section id="section1" className="section section1 relative">
          <div className="relative text-white">
            <div className="absolute p-1 w-full  bg-gray-900 bg-opacity-50">
              <div className="flex items-center justify-start px-1">
                <Image
                  src={icon}
                  alt=""
                  className="object-cover rounded-full flex items-center justify-center"
                  width="60"
                  height="60"
                />
                <div className="pl-2 flex flex-col">
                  <p className="font-bold font-lg">鈴木拓也</p>
                  <div className="flex">
                    <button
                      className="hover:bg-yellow-700 font-bold p-1 text-xs rounded mt-2"
                      style={{ color: "#f00a00", border: "2px solid #f00a00" }}
                    >
                      フォローする
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center ml-5">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-500 mr-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 ml-5"
                      style={{ color: "#f00a00" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs pt-2">
                    0いいね 0いきたい 0コメント
                  </p>
                  <div className="flex items-center justify-center">
                    <p>評価：また行きたい</p>
                    <p className="pl-3 text-xl" style={{ color: "#f00a00" }}>
                      ★★★★☆
                    </p>
                  </div>
                </div>
              </div>
              <p className="w-full text-xs">@新宿　エルボラーちょ</p>
              <p className="w-full p-2">
                メキシコ料理をリーズナブルに食べられる。
                味の濃いジャンバラヤで酒が進む。
              </p>
            </div>
            <div>
              <video
                autoPlay
                className="overflow-hidden"
                width="414"
                height="10"
                muted
                playsInline
                objectfit="true"
                loop
                src={require("../../public/IMG_2653.mp4")}
              ></video>
            </div>
          </div>
        </section>
        <section id="section1" className="section section1 relative">
          <div className="relative text-white">
            <div className="absolute p-1 w-full  bg-gray-900 bg-opacity-50">
              <div className="flex items-center justify-start px-1">
                <Image
                  src={icon3}
                  alt=""
                  className="object-cover rounded-full flex items-center justify-center"
                  width="60"
                  height="60"
                />
                <div className="pl-2 flex flex-col">
                  <p className="font-bold font-lg">田中博</p>
                  <div className="flex">
                    <button
                      className="hover:bg-yellow-700 font-bold py-1 px-1 rounded mt-2"
                      style={{ color: "#f00a00", border: "2px solid #f00a00" }}
                    >
                      フォローする
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center ml-5">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-500 mr-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 ml-5"
                      style={{ color: "#f00a00" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs pt-2">
                    22いいね 8いきたい 1コメント
                  </p>
                  <div className="flex items-center justify-center">
                    <p>評価：また行きたい</p>
                    <p className="pl-3 text-xl" style={{ color: "#f00a00" }}>
                      ★★★★☆
                    </p>
                  </div>
                </div>
              </div>
              <p className="w-full text-xs">＠銀座　かつ吉</p>

              <p className="w-full p-2">
                三元豚の分厚いヒレカツを、カツ丼でいただきました♪
                お肉が柔らかく、薄味の出汁によく合います。豚汁も嬉しい。
              </p>
            </div>
            <div>
              <video
                autoPlay
                className="overflow-hidden"
                width="414"
                height="10"
                muted
                objectfit="true"
                playsInline
                loop
                src={require("../../public/IMG_176689294.mp4")}
              ></video>
            </div>
          </div>
        </section>
        <section id="section1" className="section section1 relative">
          <div className="relative text-white">
            <div className="absolute p-1 w-full  bg-gray-900 bg-opacity-50">
              <div className="flex items-center justify-start px-2">
                <Image
                  src={icon4}
                  alt=""
                  className="object-cover rounded-full flex items-center justify-center"
                  width="60"
                  height="60"
                />
                <div className="pl-2 flex flex-col">
                  <p className="font-bold font-lg">斎藤理恵</p>
                  <div className="flex">
                    <button
                      className="hover:bg-yellow-700 font-bold p-1 text-xs rounded mt-2"
                      style={{ color: "#f00a00", border: "2px solid #f00a00" }}
                    >
                      フォローする
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center ml-5">
                  <div className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-500 mr-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 ml-5"
                      style={{ color: "#f00a00" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </div>
                  <p className="text-xs pt-2">
                    50いいね 39いきたい 12コメント
                  </p>
                  <div className="flex items-center justify-center">
                    <p>評価：また行きたい</p>
                    <p className="pl-3 text-xl" style={{ color: "#f00a00" }}>
                      ★★★★☆
                    </p>
                  </div>
                </div>
              </div>
              <p className="w-full text-xs">@＠青山　寿司くどう</p>

              <p className="w-full p-2">
                気さくな大将と豊富な日本酒で、つまみと握りが次々と出てきます。
                締めの太巻きが絶品です。
              </p>
            </div>
            <div>
              <video
                autoPlay
                className="overflow-hidden"
                width="414"
                height="10"
                muted
                objectfit="true"
                playsInline
                loop
                src={require("../../public/IMG_257482075.mp4")}
              ></video>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
