import Modal from 'react-modal';
import { useState } from 'react';
import icon from "../../public/img01.jpg";
import icon2 from "../../public/pngn.jpg";
import icon3 from "../../public/001.png";
import icon4 from "../../public/002.png";
import Image from "next/image";

// スタイリング
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
    backgroundColor       : "rgba(255,230,206,1)",
    // backgroundColor       : "rgba(255,238,238,3)",
    borderRadius          : "1rem",
    padding               : "1.5rem"
  }
};

// アプリのルートを識別するクエリセレクタを指定する。
Modal.setAppElement('#__next')

const ModalCommentDisplay = ({ xmlns, className, style, fill, viewBox, stroke, strokeLinecap, strokeLinejoin, strokeWidth, d }) => {
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
          
          <header>4件のコメント</header>
          <button onClick={closeModal}></button>
          
          <section className="flex items-center justify-start px-2"> 
            <Image
              src={icon}
              alt=""
              className="object-cover rounded-full flex items-center justify-center"
              width="30"
              height="30"
            />
            <p className="font-bold font-lg block m-1">鈴木拓也</p>
          </section>
          <p className="ml-12 mb-4">美味しそう！食べてみたい！</p>

          <section className="flex items-center justify-start px-2"> 
            <Image
              src={icon2}
              alt=""
              className="object-cover rounded-full flex items-center justify-center"
              width="30"
              height="30"
            />
            <p className="font-bold font-lg block m-1">山田花子</p>
          </section>
          <p className="ml-12 mb-4">お腹減ってきた！</p>

          <section className="flex items-center justify-start px-2"> 
            <Image
              src={icon3}
              alt=""
              className="object-cover rounded-full flex items-center justify-center"
              width="30"
              height="30"
            />
            <p className="font-bold font-lg block m-1">田中博</p>
          </section>
          <p className="ml-12 mb-4">うまそーーー</p>

          <section className="flex items-center justify-start px-2"> 
            <Image
              src={icon4}
              alt=""
              className="object-cover rounded-full flex items-center justify-center"
              width="30"
              height="30"
            />
            <p className="font-bold font-lg block m-1">斎藤理恵</p>
          </section>
          <p className="ml-12 mb-4">うちの近所のお店だーいつも混んでてキニってたんだよね！</p>
        </Modal>
      </>
    )
}

export default ModalCommentDisplay
