import Modal from 'react-modal';
import { useState } from 'react';

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
    height                : '350px',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : "rgba(255,230,206,1)",
    borderRadius          : "1rem",
    padding               : "1.5rem"
  }
};

// アプリのルートを識別するクエリセレクタを指定する。
Modal.setAppElement('#__next')

const ModalCommentInput = ({ xmlns, className, style, fill, viewBox, stroke, strokeLinecap, strokeLinejoin, strokeWidth, d }) => {
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
          <button onClick={closeModal}></button>

          <form>
            <textarea
              className="mt-1 block w-full rounded-md h-52
              border-gray-300 shadow-sm focus:border-indigo-300 
              focus:ring focus:ring-indigo-200 focus:ring-opacity-50" rows="10"
            ></textarea>
            <button
              className="block mx-auto mt-2 p-2 text-white bg-yellow-500 w-6/12"
              type="submit"
              >投稿
            </button>
          </form>
        </Modal>
      </>
    )
}

export default ModalCommentInput
