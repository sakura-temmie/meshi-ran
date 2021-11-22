// import movie from "../../public/kz3zu-jc3v1.mp4";
// import icon from "../../public/img01.jpg";
// import icon2 from "../../public/pngn.jpg";
// import icon3 from "../../public/001.png";
// import icon4 from "../../public/002.png";
// import Image from "next/image";
// import image from "next/image";
// import { data } from "autoprefixer";
import Layout from "../../components/layout/Layout";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import ModalComment from "../../components/window/ModalComment";
import { doc, collection, query, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../src/firebase";

export default function MainIndex() {

  const [isFollowIconState, setFollowIconState] = useState(true);
  const [isLikeIconState, setLikeIconState] = useState(true);
  const [isWantIconState, setWantIconState] = useState(true);

  // 投稿動画に表示するユーザー情報の取得 ////////////////////
  // Firebase から posts データを取得する
  const[posts, setPosts]= useState(new Array());

  const getPosts = async (e) => {
    try {
      const q = query(collection(db, "posts"));
      const querySnapshot = await getDocs(q);
      let cnt = 0;
      const values = new Array();
      querySnapshot.forEach((doc) =>{
        values[cnt] = 
        {
          id: doc.id,
          likes: doc.data().likes,
          movieUrl: doc.data().movieUrl,
          post_text: doc.data().post_text,
          restaurantAdress: doc.data().restaurantAdress,
          restaurantName: doc.data().restaurantName,
          restaurantsRef: doc.data().restaurantsRef,
          userId: String(doc.data().userId),
          wants: doc.data().wants,
        }
        ++cnt
      })

      // 投稿に対するコメントの総数といいね総数といきたい総数
      for(let i = 0; i < values.length; i++) {
        // 投稿に対するコメントの総数
        const qPostALlComments = query(collection(db, "posts", values[i].id, "comments"));
        let comAllCnt = 0;
        const qPacSnapshot = await getDocs(qPostALlComments);
        qPacSnapshot.forEach(()=>{
          comAllCnt++;
        });
        values[i].comAllCnt = comAllCnt;

        // いいね総数といきたい総数
        values[i].likeCnt = 0;
        values[i].wantCnt = 0;
        values[i].likeCnt += values[i].likes.length;
        values[i].wantCnt += values[i].wants.length;
      }

      // 投稿者の名前とアイコンを取得
      for(let i = 0; i < values.length; i++) {
        const docRef = doc(db, "users", values[i].id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          values[i].name = docSnap.data().name;
          values[i].imageUrl = docSnap.data().imageUrl;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }

      setPosts(values);

    } catch (e) {
      console.log("Error document:",e);
    }
  }
  ///////////////////////////////////////
  const getUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log(user);
    if (user !== null) {
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;
      const uid = user.uid;
      console.log(displayName, email, photoURL, emailVerified, uid);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getUser();
      getPosts();
    }
  }, []);

  // console.log("posts",posts);

  return (
    <Layout title="みんなの投稿">
      <div className="fullPageScroll">

      {posts.map((datas)=>(
      <section id="section1" className="section section1 relative">
          <div className="relative text-white">
            <div className="absolute">
              <video
                autoPlay
                className="overflow-hidden"
                width="414"
                height="10"
                muted
                playsInline
                objectfit="true"
                loop
                src={datas.movieUrl}
              ></video>
            </div>
            <div className="absolute p-1 w-full bg-gray-900 bg-opacity-50">
              <div className="flex items-center justify-around px-2">
                <div className="flex">
                  <img
                    src={datas.imageUrl}
                    alt=""
                    className="object-cover rounded-full flex items-center justify-center"
                    width="60"
                    height="60"
                  />
                  <div className="pl-2 flex flex-col">
                    <p className="font-bold font-lg">{datas.name}</p>
                    <div className="flex">
                      <button onClick={() => (isFollowIconState===true ? setFollowIconState(false) : setFollowIconState(true))}
                        className="hover:bg-yellow-700 font-bold p-1 text-xs rounded mt-2"
                        style={isFollowIconState ? { backgroundColor: "transparent",color: "#fff", border: "2px solid #fff" } 
                        : { backgroundColor: "transparent", color: "#f00a00", border: "2px solid #f00a00" } }
                      >
                        フォロー
                        {/* {isFollowIconState ? "フォローする" : "フォロー中"} */}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center ml-2">
                  <div className="flex">
                    <svg
                      onClick={() => (isLikeIconState===true ? setLikeIconState(false) : setLikeIconState(true))}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-500 mr-5"
                      style={isLikeIconState ? { color: "#fff" } : { color: "#f00a00" } }
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
                    <ModalComment
                     postid={datas.id}
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-6 w-6"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                    <svg
                      onClick={() => (isWantIconState===true ? setWantIconState(false) : setWantIconState(true))}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 ml-5"
                      style={isWantIconState ? { color: "#fff" } : { color: "#f00a00" } }
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
                  <p className="text-xs pt-2">{datas.likeCnt}いいね {datas.comAllCnt}コメント {datas.wantCnt}いきたい</p>
                  <div className="flex items-center justify-center">
                    <p>評価：</p>
                    <p className="pl-1 text-xl" style={{ color: "#f00a00" }}>
                      ★★★★☆
                    </p>
                  </div>
                </div>
              </div>
              <p className="w-full text-xs">{datas.restaurantName}</p>
              <p className="w-full p-2">
                {datas.post_text}
              </p>
            </div>
          </div>
        </section>
        ))}
        
        {/* 以下、旧コード（FireBase連携前 */}
        {/* <section id="section1" className="section section1 relative">
          <div className="relative text-white">
            <div className="absolute">
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
                      style={{ color: "#f00a00" }}
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
                    <ModalCommentInput
                      const xmlns="http://www.w3.org/2000/svg"
                      const className="h-6 w-6"
                      const fill="none"
                      const viewBox="0 0 24 24"
                      const stroke="currentColor"
                      const strokeLinecap="round"
                      const strokeLinejoin="round"
                      const strokeWidth={2}
                      const d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                    <ModalCommentDisplay
                      const xmlns="http://www.w3.org/2000/svg"
                      const className="h-6 w-6 ml-5"
                      const style={{ color: "#f00a00" }}
                      const fill="none"
                      const viewBox="0 0 24 24"
                      const stroke="currentColor"
                      const strokeLinecap="round"
                      const strokeLinejoin="round"
                      const strokeWidth={2}
                      const d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </div>
                  <p className="text-xs pt-2">30いいね 3コメント 14いきたい</p>
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
          </div>
        </section>

        <section id="section1" className="section section1 relative">
          <div className="relative text-white">
            <div className="absolute">
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
                      style={{
                        background: "#f00a00",
                        border: "2px solid #f00a00",
                      }}
                    >
                      フォロー中
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
                    <ModalCommentInput
                      const xmlns="http://www.w3.org/2000/svg"
                      const className="h-6 w-6"
                      const fill="none"
                      const viewBox="0 0 24 24"
                      const stroke="currentColor"
                      const strokeLinecap="round"
                      const strokeLinejoin="round"
                      const strokeWidth={2}
                      const d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    <ModalCommentDisplay
                      const xmlns="http://www.w3.org/2000/svg"
                      const className="h-6 w-6 ml-5"
                      const style={{ color: "#f00a00" }}
                      const fill="none"
                      const viewBox="0 0 24 24"
                      const stroke="currentColor"
                      const strokeLinecap="round"
                      const strokeLinejoin="round"
                      const strokeWidth={2}
                      const d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                  </div>
                  <p className="text-xs pt-2">0いいね 0いきたい 0コメント</p>
                  <div className="flex items-center justify-center">
                    <p>評価：また行きたい</p>
                    <p className="pl-1 text-xl" style={{ color: "#f00a00" }}>
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
          </div>
        </section>
    
        <section id="section1" className="section section1 relative">
          <div className="relative text-white">
            <div className="absolute">
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
                      className="hover:bg-yellow-700 font-bold p-1 text-xs rounded mt-2"
                      style={{
                        background: "#f00a00",
                        border: "2px solid #f00a00",
                      }}
                    >
                      フォロー中
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
                    <ModalCommentInput
                      const xmlns="http://www.w3.org/2000/svg"
                      const className="h-6 w-6"
                      const fill="none"
                      const viewBox="0 0 24 24"
                      const stroke="currentColor"
                      const strokeLinecap="round"
                      const strokeLinejoin="round"
                      const strokeWidth={2}
                      const d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    <ModalCommentDisplay
                      const xmlns="http://www.w3.org/2000/svg"
                      const className="h-6 w-6 ml-5"
                      const style={{ color: "#f00a00" }}
                      const fill="none"
                      const viewBox="0 0 24 24"
                      const stroke="currentColor"
                      const strokeLinecap="round"
                      const strokeLinejoin="round"
                      const strokeWidth={2}
                      const d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                  </div>
                  <p className="text-xs pt-2">22いいね 8いきたい 1コメント</p>
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
          </div>
        </section>

        <section id="section1" className="section section1 relative">
          <div className="relative text-white">
            <div className="absolute">
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
                      style={{
                        background: "#f00a00",
                        border: "2px solid #f00a00",
                      }}
                    >
                      フォロー中
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
                    <ModalCommentInput
                      const xmlns="http://www.w3.org/2000/svg"
                      const className="h-6 w-6"
                      const fill="none"
                      const viewBox="0 0 24 24"
                      const stroke="currentColor"
                      const strokeLinecap="round"
                      const strokeLinejoin="round"
                      const strokeWidth={2}
                      const d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                    <ModalCommentDisplay
                      const xmlns="http://www.w3.org/2000/svg"
                      const className="h-6 w-6 ml-5"
                      const style={{ color: "#f00a00" }}
                      const fill="none"
                      const viewBox="0 0 24 24"
                      const stroke="currentColor"
                      const strokeLinecap="round"
                      const strokeLinejoin="round"
                      const strokeWidth={2}
                      const d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </div>
                  <p className="text-xs pt-2">50いいね 39いきたい 12コメント</p>
                  <div className="flex items-center justify-center">
                    <p>評価：また行きたい</p>
                    <p className="pl-1 text-xl" style={{ color: "#f00a00" }}>
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
   
          </div>
        </section> */}
      </div>
    </Layout>
  );
}
