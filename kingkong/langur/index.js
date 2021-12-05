const sha256 = require("crypto-js/sha256");
const kg = require("./kg");

const ec = new require("elliptic").ec("secp256k1");

class Transaction {
  constructor(from, to, amount) {
    if (amount < 0) {
      throw new Error("Amount cannot be less then 0.");
    }
    this.fromAddress = from;
    this.toAddress = to;
    this.amount = amount;
  }

  calculateHash() {
    return sha256(this.fromAddress + this.toAddress + this.amount).toString();
  }

  sign(signingKey) {
    if (signingKey.getPublic("hex") !== this.fromAddress) {
      throw new Error("You cannot sign txs for other wallets!");
    }

    const hashTx = this.calculateHash();
    const sig = signingKey.sign(hashTx, "base64");
    this.signature = sig.toDER("hex");
  }

  isValid(balance = null) {
    if (this.fromAddress === null) return true;
    if (!this.signature || this.signature.length === 0) {
      throw new Error("No signature in this transaction");
    }

    if (balance !== null)
      if (balance - this.amount < 0) {
        throw new Error("Insufficient funds.");
      }

    const publicKey = ec.keyFromPublic(this.fromAddress, "hex");
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = "") {
    this.timestamp = timestamp;
    /**
     * transactions
     * @type {Transaction[]}
     * @public
     */
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return sha256(
      this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }

  hasValidTransactions() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) return false;
    }
    return true;
  }
}

function createGenesisBlock() {
  return new Block(new Date().toISOString(), "Genesis Block", "");
}

class Blockchain {
  constructor({ difficulty, miningReward, dumpChain, dumpTransactions } = {}) {
    /**
     * Block chain
     * @type {Block[]}
     * @public
     */
    this.chain = dumpChain || [createGenesisBlock()];
    this.difficulty = difficulty || 3;
    /**
     * pending transactions
     * @type {Transaction[]}
     * @public
     */
    this.pendingTransactions = dumpTransactions || [];
    this.miningReward = miningReward || 100;
  }

  minePendingTransactions(miningRewardAddress) {
    console.log(`${miningRewardAddress} is mining`);
    const block = this.createBlock(this.pendingTransactions);
    block.mineBlock(this.difficulty);
    this.chain.push(block);
    console.log("Mined...");

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
  }

  addTransaction(transaction) {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error("Transaction must include from & to adresses.");
    }
    if (
      !transaction.isValid(this.getBalanceOfAddress(transaction.fromAddress))
    ) {
      throw new Error("Cannot add invalid transaction.");
    }
    this.pendingTransactions.push(transaction);
  }

  /**
   *
   * @param address
   * @param {'from', 'to', null} direction
   * @returns Transaction[]
   */
  getTransactionsOfAddress(address, direction = null) {
    const txs = [];
    const enforce = (tx) => {
      switch (direction) {
        case 'from': {
          if (tx.fromAddress === address) txs.push(tx);
          break;
        }
        case 'to': {
          if (tx.toAddress === address) txs.push(tx);
          break;
        }
        default: {
          if (tx.toAddress === address || tx.fromAddress === address) txs.push(tx);
        }
      }
    }
    for (const block of this.chain)
      for (const tx of block.transactions)
        enforce(tx);
    return txs;
  }

  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx.fromAddress === address) balance -= tx.amount;
        if (tx.toAddress === address) balance += tx.amount;
      }
    }

    return balance;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  createBlock(data) {
    return new Block(
      new Date().toUTCString(),
      data,
      this.getLatestBlock().hash
    );
  }

  addBlock(data) {
    const newBlock = this.createBlock(data);
    console.log(`Mining ${this.chain.length} block`);
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
    console.log(
      `Block ${this.chain.length - 1} hash: ${
        this.chain[this.chain.length - 1].hash
      }`
    );
  }

  isChainValid() {
    if (this.chain.length <= 1) return true;
    for (let idx = 1; idx < this.chain.length; idx++) {
      const current = this.chain[idx];
      const previous = this.chain[idx - 1];

      if (!current.hasValidTransactions()) {
        return false;
      }

      if (current.hash !== current.calculateHash()) return false;
      if (current.previousHash !== previous.hash) return false;
    }
    return true;
  }
}

module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;
module.exports.Block = Block;
module.exports.generatePair = kg.generatePair;
module.exports.formatPair = kg.formatPair;
