import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Button } from "react-bootstrap";
import ConnectWalletModal from "../components/ConnectWalletModal";
import { useState } from "react";
import useUser from "../lib/useWallet";

export default function Home() {
  const { user } = useUser();
  const [showConnectModal, setShowConnectModal] = useState(false);
  return (
    <div className={styles.grid}>
      <>
        <h1 className={styles.title}>
          Welcome to <a href=".">King Kong Chain</a>
        </h1>
        <ConnectWalletModal
          handleClose={() => setShowConnectModal(false)}
          show={showConnectModal}
        />
        <p className={styles.description}>
          Get started by logging into your wallet! (or creating a new one)
          <br />
          {user?.isLoggedIn ? (
            <>
              <p style={{ color: "red" }}>Connected!</p>
              {/*{user?.wallet?.bonusReceived || (*/}
              <Button
                onClick={async () => {
                  await fetch("/api/bonus");
                }}
              >
                Receive bonus reward!
              </Button>
              {/*)}*/}
              <br />
              <Button>Disconnect</Button>
            </>
          ) : (
            <Button onClick={() => setShowConnectModal(true)}>Connect</Button>
          )}
          {/*<code className={styles.code}>pages/index.js</code>*/}
        </p>

        <div className={styles.grid}>
          <a href="/history" className={styles.card}>
            <h2>View blocks</h2>
            <p>View blockchain history from beginning!</p>
          </a>

          <a href="/history" className={styles.card}>
            <h2>View pending transactions</h2>
            <p>
              View transactions and mine blocks.
              <br />
            </p>
          </a>

          {/*<a*/}
          {/*  href="https://github.com/vercel/next.js/tree/master/examples"*/}
          {/*  className={styles.card}*/}
          {/*>*/}
          {/*  <h2>Examples &rarr;</h2>*/}
          {/*  <p>Discover and deploy boilerplate example Next.js projects.</p>*/}
          {/*</a>*/}

          {/*<a*/}
          {/*  href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"*/}
          {/*  className={styles.card}*/}
          {/*>*/}
          {/*  <h2>Deploy &rarr;</h2>*/}
          {/*  <p>*/}
          {/*    Instantly deploy your Next.js site to a public URL with Vercel.*/}
          {/*  </p>*/}
          {/*</a>*/}
        </div>
      </>
    </div>
  );
}
