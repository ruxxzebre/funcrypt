import { Blockchain } from "langur";
import axios from "axios";
import * as fs from "fs";

const dump = JSON.parse(fs.readFileSync("dump.json"));
export const bcInstance = new Blockchain({
  difficulty: 4,
  miningReward: 10,
  dumpChain: dump.chain,
});

const BC_BACKEND_PORT = 666;

// Blockchain API
const bAPI = axios.create({
  baseURL: `http://localhost:${BC_BACKEND_PORT}`
});
