import { withIronSessionApiRoute } from "iron-session/next";
import { ec as EC } from "elliptic";
import status from "http-status";
import { sessionOptions } from "../../lib/session";

const ec = new EC("secp256k1");

export default withIronSessionApiRoute(async function connectWallet(req, res) {
  if (req.method !== "POST")
    return res.status(status.METHOD_NOT_ALLOWED).send("");
  const privateKey = JSON.parse(req.body).privateKey;
  if (!privateKey) {
    return res.status(status.BAD_REQUEST).send("Private key is not provided.");
  }
  // error handling when private key is invalid
  const key = ec.keyFromPrivate(privateKey);
  req.session.user = {
    wallet: {
      publicKey: key.getPublic("hex"),
      privateKey: key.getPrivate("hex"),
    },
    isLoggedIn: true,
  };
  await req.session.save();
  res.send({ ok: true });
}, sessionOptions);
