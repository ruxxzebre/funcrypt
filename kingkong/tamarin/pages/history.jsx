import Cardy from "../components/Card";
import styles from "../styles/Home.module.css";
import { bcInstance } from "../lib/blockchain.service";

const History = ({ chain }) => {
  console.log(chain);
  return (
    <div>
      <h1 className={styles.title}>
        Welcome to <a href=".">King Kong Chain</a>
      </h1>
      {/*<pre>{JSON.stringify(chain, null, 4)}</pre>*/}
      <div className="d-flex justify-content-between">
        {chain.map((c, idx) => {
          return <Cardy block={c} order={idx} />;
        })}
      </div>
    </div>
  );
};

export default History;

export const getServerSideProps = () => {
  const j = JSON.parse(JSON.stringify(bcInstance.chain));

  return {
    props: { chain: j },
  };
};
