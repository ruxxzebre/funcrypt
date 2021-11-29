import { withIronSessionApiRoute } from "iron-session/next";
import status from "http-status";
import { sessionOptions } from "../../lib/session";
import { bcInstance } from "../../lib/blockchain.service";

export default withIronSessionApiRoute(async function receiveBonus(req, res) {
  if (!req.session?.user) return res.status(400).send("");
  const balance = bcInstance.getBalanceOfAddress(
    req.session?.user.wallet.publicKey
  );
  res.send({ balance });
}, sessionOptions);
