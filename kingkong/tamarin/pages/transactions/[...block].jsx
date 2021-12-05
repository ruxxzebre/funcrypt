import {useRouter} from "next/router";
import {useTransactions} from "../../lib/blockchainHooks";

const BlockTransactions = () => {
    const router = useRouter();
    const txs = useTransactions();
    return <div>
        {router.query.block}
    </div>;
};

export default BlockTransactions;