import { withIronSessionApiRoute } from "iron-session/next";
import status from "http-status";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(async function connectWallet(req, res) {
  await req.session.destroy();
  res.send({ ok: true });
}, sessionOptions);
