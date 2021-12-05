import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { BC } from "../../lib/blockchain.service";

export default withIronSessionApiRoute(async function receiveBonus(req, res) {
  if (!req.session?.user) return res.status(400).send("");
  const account = req.session?.user.wallet.publicKey;
  await BC.mine(account);
  req.session.user.wallet.bonusReceived = true;
  await req.session.save();
  res.send({ ok: true });
}, sessionOptions);
