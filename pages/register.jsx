import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../src/firebase";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [truePassword, setTruePassword] = useState("");

  const regex =
    /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
  const isTrueEmail = regex.test(email);
  const isTruePassword = password === truePassword;
  const isTrueRegister =
    isTrueEmail == true &&
    isTruePassword == true &&
    !(password == null || password == "");

  const googleSignIn = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        router.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        //エラーコード表示させる処理あれば書く
        swal(errorMessage, email, "error").then((willSearch) => {
          if (willSearch) {
            router.push("/");
          }
        });
        console.log(errorMessage, errorMessage, email, credential);
      });
  };

  return (
    <Layout title="新規登録">
      <div className="max-w-md w-full space-y-8 bg-white rounded p-10">
        <div className="flex flex-col items-center">
          <h2 className="mt-3 text-center text-3xl font-extrabold text-gray">
            新規登録
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            アカウントをお持ちの場合は
            <Link href="/">
              <a className="font-medium text-red-400 hover:text-red-500">
                ログイン
              </a>
            </Link>
          </p>
          <div className="pt-4">
            <p>メールアドレス</p>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
              placeholder="例）xxx@xxx.co.jp"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="pt-4">
            <p>パスワード</p>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
              placeholder="パスワード"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="pt-4">
            <p>パスワード（確認）</p>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
              placeholder="パスワード（確認）"
              value={truePassword}
              onChange={(e) => {
                setTruePassword(e.target.value);
              }}
            />
          </div>

          <div className="text-center pt-8">
            {isTrueRegister ? (
              <button
                type="submit"
                className="text-lg hover:bg-red-700 text-white font-bold py-2 px-16 rounded"
                style={{ background: "#f00a00" }}
                onClick={googleSignIn}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                メールアドレスを登録
              </button>
            ) : (
              <div>
                <span className="text-xs pl-2 text-red-400">
                  入力されている情報が正しくありません
                </span>
                <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 cursor-not-allowed">
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                  メールアドレスを登録
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
