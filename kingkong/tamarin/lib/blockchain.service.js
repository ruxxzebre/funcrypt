import { Blockchain, Transaction } from "gorewind";
import * as fs from "fs";

const dump = JSON.parse(fs.readFileSync("dump.json"));
export const bcInstance = new Blockchain({
  difficulty: 4,
  miningReward: 10,
  dumpChain: dump.chain,
});

setTimeout(() => {
  console.log(bcInstance.chain);
  fs.writeFileSync("dump.json", JSON.stringify(bcInstance));
  console.log("dumped");
}, 1500);
