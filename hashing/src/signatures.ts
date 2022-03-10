import { ec as EC } from "elliptic";
import * as fs from "fs";
import path from "path";

const ec = new EC("secp256k1");

const keyPair = ec.genKeyPair();

const pathToPresentation = path.resolve(__dirname, 'presentation/sha256_chaikovskyiPavlo.key');
const pathToChangedPresentation = path.resolve(__dirname, 'presentation/sha256_chaikovskyiPablo.key');

const presentationBuffer = fs.readFileSync(pathToPresentation);
const changedPresentationBuffer = fs.readFileSync(pathToChangedPresentation);

const signature = ec.sign(presentationBuffer, keyPair);
console.log(`
Public key: ${keyPair.getPublic("hex")}
Private key: ${keyPair.getPrivate()}

Signature for 'sha256_chaikovskyiPavlo.key': ${signature.toDER('hex')}
Signature for 'sha256_chaikovskyiPablo.key': ${signature.toDER('hex')}

Verification:

Verify signature "${signature.toDER('hex')}" of "sha256_chaikovskyiPavlo.key":
  Public key: 
    ${ec.keyFromPublic(keyPair.getPublic("hex"), "hex")}
`)