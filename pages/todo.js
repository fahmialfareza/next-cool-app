import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import styles from "../styles/Index.module.css";

export default function Todo() {
  return (
    <div className="container">
      <Head>
        <title>My Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="title">Cool stuff todo Today</h1>
        <Header />
      </main>
    </div>
  );
}
