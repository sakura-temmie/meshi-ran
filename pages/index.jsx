import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import SignUp from "../components/auth/SignUp";
import Layout from "../components/layout/Layout";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";




export default function Home() {
  const [email, setEmail] = useState();

  return (
    <div className={styles.container}>
      <Layout title="メシラン">
        <SignUp />
      </Layout>

    </div>
  );
}
