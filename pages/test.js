import {
  collection,
  doc,
  setDoc,
  addDoc,
  getFirestore,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useState } from "react";

const firebaseApp = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BAKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});

const db = getFirestore();

export default function Home() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  
  const update = async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        name: name,
        age: age,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
      </div>
    </>
  );
}
