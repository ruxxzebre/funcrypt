import { ec as EC } from "elliptic";
import * as fs from "fs";

const ec = new EC("secp256k1");

const keyPair = ec.genKeyPair();

fs.writeFileSync(__dirname + '/key', JSON.stringify({
  priv: keyPair.getPrivate(),
  pub: keyPair.getPublic()
}));

const presentationPath = __dirname + '/presentation';
const fileToSign = fs.readFileSync(__dirname + '/index.ts');

const signature = ec.sign(fileToSign, keyPair);
console.log(signature.toDER('hex'));