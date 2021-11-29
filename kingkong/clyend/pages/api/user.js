import { sessionOptions } from "../../lib/session";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(async function userRoute(
  req,
  res,
  session
) {
  console.log("session");
  console.log(req.session);
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    console.log("da fu");
    res.json({
      isLoggedIn: false,
      wallet: {
        publicKey: null,
        privateKey: null,
      },
    });
  }
},
sessionOptions);
