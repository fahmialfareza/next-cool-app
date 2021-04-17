import Head from "next/head";
import image from "./assets/images/firebase.png";
import "../styles/Index.module.less";

export default function Home() {
  return (
    <>
      <Head>
        <title>My Cool App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">Welcome to My App</h1>
        <img src={image} alt="" />
      </main>
    </>
  );
}
