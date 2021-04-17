import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { connect } from "react-redux";
import { setInfo } from "../redux/actions/main";
import "../styles/Index.module.less";

const Weather = ({ userInfo, setInfo }) => {
  const [name, setName] = useState("");

  return (
    <>
      <Head>
        <title>The Weather</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">Today is Looking Good for {userInfo.name}</h1>
        <input
          type="text"
          value={name}
          name="name"
          onChange={(event) => setName(event.target.value)}
        />
        <button onClick={() => setInfo(name)}>Submit</button>
      </main>
    </>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.main,
});

const mapDispatchToProps = {
  setInfo: setInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
