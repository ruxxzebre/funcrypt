const express = require("express");
const fs = require("fs");
const EC = require("elliptic").ec;
const { Blockchain, Transaction } = require("gorewind");
const { generatePair, formatPair} = require("gorewind/kg");

const BCInstance = new Blockchain({
    difficulty: 4,
    miningReward: 10,
});

const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get("/wallet/balance/:address", (req, res) => {
    res.json({ balance: BCInstance.getBalanceOfAddress(req.params.address) });
});

router.get("/wallet/generate-keys", (_req, res, next) => {
    console.log("New key pair generated.");
    res.locals.result = formatPair(generatePair());
    next();
}, (req, res) => {
    res.send({ data: res.locals.result });
});

router.get("/chain", (req, res) => {
    console.log("Blockchain read.");
    res.json(BCInstance.chain);
});

router.get("/chain/filter", (req, res) => {
    const result = {};
    console.log("Filter read. " + JSON.stringify(req.query));
    const bckeys = Object.keys(BCInstance);
    Object.keys(req.query).forEach((k) => {
        if (bckeys.includes(k)) result[k] = BCInstance[k];
    });
    res.json(result);
});

router.get("/block/:hash?", (req, res) => {
    console.log(`Block with ${req.params.hash} read.`);
    const found = BCInstance.chain.find((i) => i.hash === req.params.hash);
    if (!found) return res.json({ blocks: BCInstance.chain });
    return res.json({ block: found });
});

router.get("/transactions/:address", (req, res) => {
    console.log(`Transaction with ${req.params.address} address read.`);
    const txs = BCInstance.getTransactionsOfAddress(req.params.address);
    return res.json({ transactions: txs });
});

router.post("/make-transaction", (req, res) => {
    const { privateKey, toAddress, amount } = req.body;
    if (!privateKey || !toAddress) {
        return res.status(400).json({
            error: `Bad request. Be sure to provide: ${
                ["privateKey", "toAddress", "amount"].filter(i => !req.body[i] && req.body !== 0).join(", ")
            }.`
        });
    }
    const ec = new EC("secp256k1");
    const key = ec.keyFromPrivate(privateKey);
    const walletAddress = key.getPublic("hex");
    console.log(`Creating transaction from ${walletAddress} to ${toAddress} with amount of ${amount} coins.`);
    const balance = BCInstance.getBalanceOfAddress(walletAddress);
    let tx
    try {
        tx = new Transaction(walletAddress, toAddress, amount);
        tx.sign(key);
        tx.isValid(balance);
    } catch (e) {
        console.log(`Transaction (from ${walletAddress} to ${toAddress}, amount: ${amount}) creation failed with '${e.message}'`);
        return res.status(400).json({ error: e.message });
    }
    BCInstance.addTransaction(tx);
    res.json({ ok: true });
});

router.post("/mine-block", (req, res) => {
    const address = req.body.address;
    if (!address) return res.status(400).send({ error: "No reward address provided." });
    console.log(`Mining pending transactions by ${address}.`);
    res.send({ message: "Mining started" });
    BCInstance.minePendingTransactions(address);
});

app.use(router);

const PORT = 6666;
app.listen(PORT, () => {
   console.log(`Listening on ${PORT}`);
});
