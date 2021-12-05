import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { bcInstance, Wallet } from "../../lib/blockchain.service";

export default withIronSessionApiRoute(async function receiveBonus(req, res) {
  if (!req.session?.user) return res.status(400).send("");
  const wallet = new Wallet(req.session?.user.wallet.privateKey);
  const [{ balance }, err] = await wallet.balance();
  console.log(balance);
  if (err) return res.status(400).send(err);
  res.send({ balance });
}, sessionOptions);
