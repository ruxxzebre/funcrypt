import Cardy from "../components/Card";
import styles from "../styles/Home.module.css";
import {useChain} from "../lib/blockchainHooks";

const History = () => {
    const {chain} = useChain();
    if (!chain) return null;
    return (
        <div>
            <h1 className={styles.title}>
                Welcome to <a href=".">King Kong Chain</a>
            </h1>
            <div className="d-flex justify-content-between flex-wrap">
                {chain.map((c, idx) => {
                    return <Cardy block={c} order={idx}/>;
                })}
            </div>
        </div>
    );
};

export default History;
