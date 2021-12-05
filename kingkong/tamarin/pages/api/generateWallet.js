import { Wallet } from "../../lib/blockchain.service";

export default async (req, res) => {
    const [data] = await Wallet.generate();
    res.json(data.data);
}
