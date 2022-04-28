import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>SWE Quora</title>
        <meta
          name="description"
          content="this App is for browsing, asking and may be able to answers other's questions"
        />
      </Head>
      <main>
        <h1>Hello from the Home Page</h1>
      </main>
    </div>
  );
};

export default Home;
