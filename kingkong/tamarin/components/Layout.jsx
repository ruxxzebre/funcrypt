import Header from "./Header";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.container}>
        <>{children}</>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://github.com/ruxxzebre"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Pavlo Chaikovskyi
        </a>
      </footer>
    </>
  );
};

export default Layout;
