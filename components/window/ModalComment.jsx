import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { doc, addDoc, setDoc, query, collection, getDocs, getDoc } from "firebase/firestore";
import { auth, db } from "../../src/firebase";
import { reload } from '@firebase/auth';

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

const ModalComment = ({ docId, xmlns, className, style, fill, viewBox, stroke, strokeLinecap, strokeLinejoin, strokeWidth, d }) => {

  //firebaseから投稿に対するコメントを取得////////////////////
  const[commentText, setCommentText]= useState(new Array());
  const[docid, setDocid] = useState();

  const displayCommentText = async (e) => {
   
    setDocid(docId);

    try {
      const q = query(collection(db, "posts", docId, "comments"));
      const querySnapshot = await getDocs(q);
      let cnt = 0;
      const values = new Array();
      querySnapshot.forEach((doc)=>{
        values[cnt] = 
        {
          timestamp: doc.id,
          userid: String(doc.data().userId),
          commentText: doc.data().commentText,
        }
        ++cnt
      });

      for(let i = 0; i < values.length; i++) {
        const str = values[i].userid.trim();
        const userDoc = doc(db, "users", str );
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          values[i].name = docSnap.data().name;
          values[i].imageUrl = docSnap.data().imageUrl;
          const sortArray = [...values].sort((a, b) => b.timestamp - a.timestamp);
          // const copy =  [...sortArray];
          setCommentText(sortArray);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!", e);
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

    let date = new Date();
    let res = [date.getFullYear()]+[1+date.getMonth()]+[date.getDate()]+[date.getHours()]+[date.getMinutes()]+[date.getSeconds()];

    try {
      const docData = { 
        commentText: comments,
        userId: auth.currentUser.uid,
      };
      await setDoc(doc(db, "posts", docid, "comments", res), docData );
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
    setIsOpen(true);
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

          {commentText.map((datas)=>(
            <>
            <section className="flex justify-start mt-5 px-2"> 
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
