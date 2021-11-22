import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { doc, setDoc, query, collection, getDocs, getDoc } from "firebase/firestore";
import { auth, db } from "../../src/firebase";

// Modalのスタイリング
const customStyles = {
  overlay: {
    position: "fixed",
    top: 40,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.3)"
  },

  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    width                 : '350px',
    height                : '500px',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : "rgba(255,255,255,1)",
    borderRadius          : "0",
    padding               : "0"
  }
};

// アプリのルートを識別するクエリセレクタを指定する。
Modal.setAppElement('#__next')

const ModalComment = ({ postid, xmlns, className, style, fill, viewBox, stroke, strokeLinecap, strokeLinejoin, strokeWidth, d }) => {

  //firebaseから投稿に対するコメントを取得////////////////////
  const[commentText, setCommentText]= useState(new Array());
  const displayCommentText = async (e) => {
   
    try {
      const q = query(collection(db, "posts", postid, "comments"));
      const querySnapshot = await getDocs(q);
      let cnt = 0;
      const values = new Array();
      querySnapshot.forEach((doc)=>{
        // console.log("posts:", postid,"userid:",doc.id,"doc:", doc.data().commentText);
        values[cnt] = 
        {
          userid: String(doc.id),
          commentText: doc.data().commentText,
        }
        ++cnt
      });

      for(let i = 0; i < values.length; i++) {
        const docRef = doc(db, "users", values[i].userid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          if (docSnap.data().name == ("")){
            // values[i].name = "登録名なし";
          }else {
            values[i].name = docSnap.data().name;
          }

          if (docSnap.data().imageUrl == ("")){
            // values[i].imageUrl = "https://firebasestorage.googleapis.com/v0/b/meshiran-2d6e1.appspot.com/o/profileImages%2Fdefault%2FPortrait_Placeholder.png?alt=media&token=33d52844-d72e-44e0-b9f5-0bd80a62e8de";
          } else {
            values[i].imageUrl = docSnap.data().imageUrl;
          }
          // console.log("values[i]", values[i]);
          setCommentText(values);
          // console.log("values:",values,"commentText:",commentText);
        } else {
          // doc.data() will be undefined in this case
          // values[i].name = "登録名なし"
          // values[i].imageUrl = "https://firebasestorage.googleapis.com/v0/b/meshiran-2d6e1.appspot.com/o/profileImages%2Fdefault%2FPortrait_Placeholder.png?alt=media&token=33d52844-d72e-44e0-b9f5-0bd80a62e8de";
          console.log("No such document!",values);
        }
      }

      
    } catch (e) {
      console.error("Error document: ", e);
    }
  };
  ///////////////////////////////////////////

  //コメントをfirebaseに登録//////////////////// 
  const [comments, setComments] = useState("");
  const update = async (e) => {
    e.preventDefault();

    const userId = auth.currentUser.uid;
    console.log("userId:",userId,"postId:",postid);

    try {
      const docData = { commentText: comments };
      await setDoc(doc(db, "posts", postid, "comments", userId), docData );
      displayCommentText();
    } catch (e) {
      console.error("Error document: ", e);
    }
  };
  ///////////////////////////////////////////

  //modal 準備////////////////////
  const [modalIsOpen,setIsOpen] = useState(false)

  // モーダルを開く処理
  const openModal = () => {
    setIsOpen(true)
  }

  const afterOpenModal = () => {
    // モーダルが開いた後の処理
  }

  // モーダルを閉じる処理
  const closeModal = () => {
    setIsOpen(false)
  }
  //////////////////////////////

  useEffect(() => {
    if (typeof window !== "undefined") {
      displayCommentText();
    }
  }, []);

  // console.log("commentText:",commentText);

    return (
      <>
        <button onClick={openModal}>
          <svg
            xmlns={xmlns}
            className={className}
            style={style}
            fill={fill}
            viewBox={viewBox}
            stroke={stroke}
          >
            <path
              strokeLinecap={strokeLinecap}
              strokeLinejoin={strokeLinejoin}
              strokeWidth={strokeWidth}
              d={d}
            />
          </svg>
        </button>
        
        <Modal
          // isOpenがtrueならモダールが起動する
          isOpen={modalIsOpen}
          // モーダルが開いた後の処理を定義
          onAfterOpen={afterOpenModal}
          // モーダルを閉じる処理を定義
          onRequestClose={closeModal}
          // スタイリングを定義
          style={customStyles}
        >
         <header className="bg-red-100 sticky top-0">
            <form className="flex justify-start" onSubmit={update}>
              <textarea
              className="shadow appearance-none w-full h-7 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="6"
              style={{ backgroundColor: "#e8ebed" , fontSize: "16px" }}
              placeholder="コメント(30字以内)"
              onChange={(e) => setComments(e.target.value)}
              />
              <button
                className="block mx-auto text-white bg-red-600 w-6/12"
                type="submit"
                disabled={!comments}
                >投稿
              </button>
            </form>
          </header>

          <button onClick={closeModal}></button>

          {commentText.map((datas)=>(
            <>
            <section className="flex justify-start px-2"> 
              <img
                src={datas.imageUrl}
                alt=""
                className="z-0 object-cover rounded-full "
                width="30"
                height="30"
              />
              <p className="font-bold font-lg block m-1">{datas.name}</p>
            </section>
            <p className="flex-none ml-12 mb-4">{datas.commentText}</p>
            </>
          ))}
        </Modal>
      </>
    )
}

export default ModalComment
