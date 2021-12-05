import {useRouter} from "next/router";

const BlockTransactions = () => {
    const router = useRouter();
    const txs = useTransactions();
    return <div>
        {router.query.block}
    </div>;
};

export default BlockTransactions;