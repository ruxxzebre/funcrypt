import useSWR from "swr";
import {fetcher} from "./fetcher";

export const useChain = () => {
    const {data: chain} = useSWR("http://localhost:8080/chain", fetcher);
    return {chain};
}

export const useTransactions = (blockHash) => {
  const {data: txs} = useSWR("http://localhost:8080/chain", fetcher);
  return { txs };
}