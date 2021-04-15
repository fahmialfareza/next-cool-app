import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { connect } from "react-redux";
import { setInfo } from "../redux/actions/main";
import Header from "../components/Header";
import styles from "../styles/Index.module.css";

const Weather = ({ userInfo, setInfo }) => {
  const [name, setName] = useState("");

  return (
    <div className="container">
      <Head>
        <title>The Weather</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className="title">Today is Looking Good for {userInfo.name}</h1>
        <Header />
        <input
          type="text"
          value={name}
          name="name"
          onChange={(event) => setName(event.target.value)}
        />
        <button onClick={() => setInfo(name)}>Submit</button>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.main,
});

const mapDispatchToProps = {
  setInfo: setInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
