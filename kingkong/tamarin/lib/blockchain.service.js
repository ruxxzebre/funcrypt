import { Blockchain } from "langur";
import * as fs from "fs";
import {bAPI} from "./api";
import {ec as EC} from "elliptic";

const dump = JSON.parse(fs.readFileSync("dump.json"));
export const bcInstance = new Blockchain({
  difficulty: 4,
  miningReward: 10,
  dumpChain: dump.chain,
});

const request = async ({
  url,
  method,
  data,
  errorMessage,
}) => {
  method = method || "get";
  errorMessage = errorMessage || null;
  data = data || null;

  if (!url) return [null, "No url provided."];

  let res = null;
  try {
    if (method === "post") res = await bAPI[method](url, data);
    else res = await bAPI[method](url);
  } catch (e) {
    return [null, errorMessage];
  }
  return [res.data, null];
}

export class Wallet {
  /**
   * Generate new public/private key pair
   * @returns {Promise<[{ public, private } | null, string | null]>}
   */
  static async generate() {
    return request({ url: "/wallet/generate-keys" });
  }

  /**
   *
   * @param {string} privateKey
   */
  constructor(privateKey) {
    this.privateKey = privateKey;

    const ec = new EC("secp256k1");
    const key = ec.keyFromPrivate(this.privateKey);

    this.publicKey = key.getPublic("hex");
  }

  async balance() {
    return request({
      url: `/wallet/balance/${this.publicKey}`,
    });
  }

  async transactions() {
    return request({
      url: `/wallet/transactions/${this.publicKey}`,
    });
  }
}

// almost fully utility class
export class BC {
  static mine(address) {
    return request({
      url: "/mine-block",
      method: "post",
      data: { address }
    });
  }
}

export const bc = new BC();