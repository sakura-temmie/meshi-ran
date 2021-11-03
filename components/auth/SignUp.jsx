import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../../src/firebase";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/meshiran_logo-03.png";
import swal from "sweetalert";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmitWithEmail = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        router.push("/main");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        swal(errorCode, errorMessage, "error").then((willSearch) => {
          if (willSearch) {
            router.push("/");
          }
        });
      });
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        router.push("/main");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //エラーコード表示
        swal(errorCode, errorMessage, "error").then((willSearch) => {
          if (willSearch) {
            router.push("/");
          }
        });
      });
  };

  // const facebookSignIn = () => {
  //   const provider = new FacebookAuthProvider();
  //   signInWithRedirect(auth, provider);
  // };

  return (
    <div>
      <div className="p-5">
        <div className="text-center">
          <Image src={Logo} alt="logo" width="200" height="200" />
        </div>
        <p className="mb-2">メールアドレス</p>
        <input
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm mb-2"
          placeholder="例）xxx@xxxco.jp"
          style={{ fontSize: "16px" }}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <p className="mb-2">パスワード</p>
        <input
          className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
          value={password}
          style={{ fontSize: "16px" }}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p className="text-gray-400">5文字以上の英数字</p>
        <div className="flex flex-col items-center justify-between mt-2 px-3">
          <button
            className="text-lg hover:bg-red-700 text-white font-bold py-2 px-8 rounded"
            style={{ background: "#f00a00" }}
            onClick={handleSubmitWithEmail}
          >
            メールでログイン
          </button>
          <button
            onClick={googleSignIn}
            className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-6 rounded text-lg inline-flex items-center"
          >
            <span>Googleでログイン</span>
          </button>
          <p className="text-center mt-8">はじめてご利用の方</p>
          <Link href="/register" passHref>
            <p className="text-lg text-yellow-600 font-bold py-2 rounded">
              アドレスの登録はこちら
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
