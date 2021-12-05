const EC = require("elliptic").ec;
const ks = require("./pair.json");
const { Blockchain, Transaction } = require("..");

const ec = new EC("secp256k1");
const myKey = ec.keyFromPrivate(ks.priv);
const myWalletAddress = myKey.getPublic("hex");

const myTx = new Transaction(myWalletAddress, "boy", 0);
myTx.sign(myKey);

const comcoin = new Blockchain({ difficulty: 4 });
comcoin.addTransaction(myTx);

comcoin.minePendingTransactions("labadaba-miner");
comcoin.minePendingTransactions("labadaba-miner");

console.log(comcoin.getBalanceOfAddress("labadaba-miner"));
console.log(comcoin.getBalanceOfAddress(myWalletAddress));
// console.log(comcoin.isChainValid());
