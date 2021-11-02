import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useState } from "react";
import { auth, db } from "../src/firebase";

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [userInfo, setUserInfo] = useState("");


  const update = async (e) => {
    e.preventDefault();
    console.log(name, age);
    const userId = auth.currentUser.uid
    console.log(user);
    try {
      const docRef = await setDoc(doc(db, "users", userId), {
        name: name,
        age: age,
      });
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const getUser = async (e) => {
    const userId = auth.currentUser.uid
    const docRef = doc(db, "users", userId);//どこからとってくるか
    const docSnap = await getDoc(docRef);//スナップショットの状態で取ってきている
    setUserInfo(docSnap.data())
    console.log(docSnap.data());//dataメソッドで中身を見ている
  };

  const getArray = async (e) => {
    // const userId = auth.currentUser.uid
    const docRef = collection(db, "restaurants");//どこからとってくるか
    const docSnap = await getDocs(docRef);//スナップショットの状態で取ってきている
    console.log(docSnap.docs);
    const data = docSnap.docs.map(doc => doc.data());
    console.log(data);
  };

  return (
    <>
      <div className="m-4">
        <form onSubmit={update}>
          <input
            className="m-3 p-3 border text-center text-base"
            value={name}
            placeholder="名前"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            className="m-3 p-3 border text-center text-base"
            value={age}
            placeholder="年"
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
          <button
            type="submit"
            className="group relative flex justify-center py-2 px-8 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 m-auto mt-6"
          >
            送る
          </button>
        </form>
          <button
          className="group relative flex justify-center py-2 px-8 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 m-auto mt-6"
          onClick={getUser}
          >
            GET
          </button>
          <button
          className="group relative flex justify-center py-2 px-8 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 m-auto mt-6"
          onClick={getArray}
          >
            GETArray
          </button>
      </div>
    </>
  );
}
