import Layout from "../../components/layout/Layout";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import ModalComment from "../../components/window/ModalComment";
import { doc, collection, query, getDocs, getDoc, updateDoc, arrayUnion, arrayRemove, setDoc } from "firebase/firestore";
import { db } from "../../src/firebase";
import { async } from "@firebase/util";

export default function MainIndex() {
  const initialState = [{
    id: "",
    likes: [],
    movieUrl: "",
    post_text: "",
    restaurantAdress: "",
    restaurantName: "",
    restaurantsRef: "",
    userId: "",
    wants: [],
    followingIds: [],
  }];

  const initialUserState = [{
    docId: "",
    birthday: "",
    bookmarkedPostDocId: [],
    followedIds: [],
    followingIds: [],
    foodCategory: "",
    imageUrl: "",
    name: "",
    userCountry: "",
    userPrefecture: "",
    userRegion: "",
  }];

  const [loginUserId, setLoginUserId] = useState("");               // ログインユーザー
  const [users, setUsers] = useState(initialUserState);             // ユーザー情報
  const [isFollowIconState, setFollowIconState] = useState(false);  // フォロー状態（true:ON false:OFF)
  const [isLikeIconState, setLikeIconState] = useState(false);      // いいね状態（true:ON false:OFF)
  const [isWantIconState, setWantIconState] = useState(false);      // 行きたい状態（true:ON false:OFF)
  const [posts, setPosts] = useState(initialState);                 // 投稿情報

  // フォローの設定
  const follow = async (postDocId, loginUserId) => {
    try {
      const postUserDocRef = doc(db, "posts", postDocId);          
      const docSnap = await getDoc(postUserDocRef);
      const postedUserId = docSnap.data().userId;                 //  フォローした投稿者のUserIdを取得
      
      console.log("loginUserId:",loginUserId,"postedUserId",postedUserId); 
      if ( isFollowIconState ) {                                  // ブックマークアイコンの状態を変える
        setFollowIconState(false);
        const userDocRef = doc(db,"users",loginUserId);            
        await updateDoc(userDocRef, {"followingIds": arrayRemove(postedUserId)});  // Firebaseのusersのfollowingに投稿したユーザーのIDを削除
      } else {
        setFollowIconState(true);
        const userDocRef = doc(db,"users",loginUserId);     
              
        await updateDoc(userDocRef, {"followingIds": arrayUnion(postedUserId)});  // Firebaseのusersのfollowingに投稿したユーザーのIDを登録
      }

    } catch {
      console.log("Error document:");
    }
  }

  // いいねの設定 //////////////////////////////////////
  const likes = async (postDocId, loginUserId) => {
    try {
      const likeDocRef = doc(db, "posts", postDocId);
      if (isLikeIconState){
        await updateDoc(likeDocRef, {"likes": arrayRemove(loginUserId)});
        setLikeIconState(false);
      } else {
        await updateDoc(likeDocRef, {"likes": arrayUnion(loginUserId)});
        setLikeIconState(true);
      }

      const posts_copy = posts.slice();
      posts.map((doc, index) =>{
        if ( String(doc.id).trim() == String(postDocId).trim() ) {
          const str = String(loginUserId).trim();
          if (isWantIconState){
            // loginUserIdを削除
            const delIndex = posts_copy[index].likes.indexOf(str);
            posts_copy[index].likes.splice(delIndex,1);
          }
          else {
            // loginUserIdを追加
            posts_copy[index].likes.push(str);
          }
        }
      })

      setPosts(posts_copy);

    } catch {
      console.log("Error document:");
    }
  }
 
  // 行きたいの設定 //////////////////////////////////////
  const wants = async (postDocId, loginUserId) => {
    try {
      const userDocRef = doc(db, "users", loginUserId);
      const wantDocRef = doc(db, "posts", postDocId);
      if (isWantIconState){
        // console.log("delete");
        await updateDoc(wantDocRef, {"wants": arrayRemove(loginUserId)});
        await updateDoc(userDocRef, {"bookmarkedPostDocId": arrayRemove(postDocId)});
        setWantIconState(false);
      } else {
        // console.log("add");
        await updateDoc(wantDocRef, {"wants": arrayUnion(loginUserId)});
        await updateDoc(userDocRef, {"bookmarkedPostDocId": arrayUnion(postDocId)});
        setWantIconState(true);
      }

      const posts_copy = posts.slice();
      posts.map((doc, index) =>{
        if ( String(doc.id).trim() == String(postDocId).trim() ) {
          const str = String(loginUserId).trim();
          if (isWantIconState){
            // loginUserIdを削除
            const delIndex = posts_copy[index].wants.indexOf(str);
            posts_copy[index].wants.splice(delIndex,1);
          }
          else {
            // loginUserIdを追加
            posts_copy[index].wants.push(str);
          }
        }
      })

      setPosts(posts_copy);
      
    } catch {
      console.log("Error document:");
    }
  }
  
  // 投稿動画に表示するユーザー情報の取得 ////////////////////
  // Firebase から posts のフィールドデータを取得する
  const getPosts = async (e) => {
    try {
      const q = query(collection(db, "posts"));
      const querySnapshot = await getDocs(q);
      let cnt = 0;
      const values = new Array();
      querySnapshot.forEach((doc) =>{
        console.log("doc:",doc.data());
        values[cnt] = 
        {
          id: String(doc.id),
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
      
      // Firebase から posts のコレクションデータ(comments)を取得する
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
        const docRef = doc(db, "users", values[i].userId);
        // console.log("values[i].userId",values[i].userId)
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

  // Firebaseのusersに登録 ////////////////
  const registerFbUsers = async (docId,imageUrl,name) => {
    try {
      const userDocRef = doc(db,"users",docId);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        // 初回ログインではない場合、フォローアイコンのオンオフを確認する
        // if( docSnap.data().bookmarkedPostDocId.length > 0 ) {setFollowIconState(true);}
        // else {setFollowIconState(false);}
      }
      else {//初回ログイン
        const copy_users = (
          [{
            docId: docId,
            birthday: "",
            bookmarkedPostDocId: [],
            followedIds: [],
            followingIds: [],
            foodCategory: "",
            imageUrl: imageUrl,
            name: name,
            userCountry: "",
            userPrefecture: "",
            userRegion: "",
          }]
        );
        setUsers(copy_users);

        const docRef = await setDoc(doc(db, "users", docId), {
          docId: docId,
          birthday: "",
          bookmarkedPostDocId: [],
          followedIds: [],
          followingIds: [],
          foodCategory: "",
          imageUrl: imageUrl,
          name: name,
          userCountry: "",
          userPrefecture: "",
          userRegion: "",
        });

      }

    } catch (e) {
      console.log("Error document:",e);
    }
  }

  // ログイン時のアイコンの状態を取得 ////////////////
  const initLikeAndWantIconState = () => {
    console.log("posts.likeCnt",posts.likeCnt);
    if (posts.likeCnt > 0) setLikeIconState(true);
    if (posts.wantCnt > 0) setWantIconState(true);
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
      // console.log(displayName, email, photoURL, emailVerified, uid);
      setLoginUserId(uid);
      registerFbUsers(uid,photoURL,displayName);
      console.log("uid",uid, "loginUserId",loginUserId);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getUser();
      getPosts();
      // initLikeAndWantIconState();
    }
  }, []);

  console.log("LastPosts",posts, "loginUserId",loginUserId);

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
                      <button onClick={() => (follow(datas.id, loginUserId))}
                        className="hover:bg-yellow-700 font-bold p-1 text-xs rounded mt-2"
                        style={{ color: "#f00a00", border: "2px solid #f00a00" }}
                        // style={isFollowIconState ? { backgroundColor: "transparent", color: "#f00a00", border: "2px solid #f00a00" } 
                        // : { backgroundColor: "transparent",color: "#fff", border: "2px solid #fff" } }
                      >
                        フォロー
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center ml-2">
                  <div className="flex">
                    <svg
                      onClick={() => (likes(datas.id, loginUserId))}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-500 mr-5"
                      style={{ color: "#f00a00" }}
                      // style={isLikeIconState ? { color: "#f00a00" } : { color: "#fff" } }
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
                     key={datas.id}
                     docId={datas.id}
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
                      onClick={() => (wants(datas.id, loginUserId))}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 ml-5"
                      style={{ color: "#f00a00" }}
                      // style={isWantIconState ? { color: "#f00a00" } : { color: "#fff" } }
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
                  {/* <p className="text-xs pt-2">{datas.likeCnt}いいね {datas.comAllCnt}コメント {datas.wantCnt}いきたい</p> */}
                  <div className="flex items-center justify-center">
                    <p>評価：</p>
                    <p className="pl-1 text-xl" style={{ color: "#f00a00" }}>
                      ★★★★☆
                    </p>
                  </div>
                </div>
              </div>
              <p className="w-full p-2 text-xs">{datas.restaurantName}</p>
              <p className="w-full p-1">
                {datas.post_text}
              </p>
            </div>
          </div>
        </section>
        ))}
      </div>
    </Layout>
  );
}
