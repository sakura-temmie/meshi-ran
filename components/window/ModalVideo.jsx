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
    width                 : '270px',
    height                : '480px',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : "rgba(255,255,255,1)",
    borderRadius          : "0",
    padding               : "0"
  }
};

// アプリのルートを識別するクエリセレクタを指定する。
Modal.setAppElement('#__next')

const ModalVideo = ({ url, index }) => {

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
      
    }
  }, []);

  
    return (
      <>
        <button onClick={openModal}>
            <video src={url} alt={index} />
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
            <video src={url} alt={index} width="270" height="480" controls muted playsInline/>
        </Modal>
      </>
    )
}

export default ModalVideo
