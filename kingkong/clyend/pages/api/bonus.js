import { withIronSessionApiRoute } from "iron-session/next";
import status from "http-status";
import { sessionOptions } from "../../lib/session";
import { bcInstance } from "../../lib/blockchain.service";

export default withIronSessionApiRoute(async function receiveBonus(req, res) {
  // await req.session.destroy();
  if (!req.session?.user) return res.status(400).send("");
  const account = req.session?.user.wallet.publicKey;
  // const balance = bcInstance.getBalanceOfAddress(account);
  // if (balance > 0) {
  //   req.session.user.wallet.bonusReceived = true;
  //   await req.session.save();
  //   return res.send("");
  // }
  bcInstance.minePendingTransactions(account);
  req.session.user.wallet.bonusReceived = true;
  await req.session.save();
  res.send({ ok: true });
}, sessionOptions);
