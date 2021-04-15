import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import styles from "../styles/Index.module.css";

export default function Weather() {
  return (
    <div className="container">
      <Head>
        <title>The Weather</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="title">Today is Looking Good</h1>
        <Header />
      </main>
    </div>
  );
}
