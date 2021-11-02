import styles from "../styles/Home.module.css";
import { useState } from "react";
import SignUp from "../components/auth/SignUp";
import Layout from "../components/layout/Layout";

export default function Home() {

  return (
      <Layout title="メシラン">
        <SignUp />
      </Layout>
  );
}
