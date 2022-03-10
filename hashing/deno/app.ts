import * as ed from "https://deno.land/x/ed25519/mod.ts";

const generateKeyPair = async () => {
  const sec = ed.utils.randomPrivateKey();
  const pub = await ed.utils.sha512(sec);
  return {
    sec, pub
  };
};

const kvPair = await generateKeyPair();