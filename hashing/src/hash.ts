import {sha256} from "js-sha256";
import fs from "fs";
import path from "path";

const initHashes = {
  just: 'd6a7339365033bf50654134ac8528b858b37cf24ca485a49d5577a63b4762603',
  changed: '832dd936c88cc7ffb7dde14ff5a4c0652afe940ee7c2c912be00b204bb9b9774'
}

console.log(`
Initial hashes for the time of preparing this code:

Presentation: ${initHashes.just}
Presentation (with one letter changed): ${initHashes.changed}

########################################################################################################
`)

/**
 * Дві презентації, різниця лиш у тому що на першому слайді в слові Pavlo, `v` звінено на 'b'
 */
const pathToPresentation = path.resolve(__dirname, 'presentation/sha256_chaikovskyiPavlo.key');
const pathToChangedPresentation = path.resolve(__dirname, 'presentation/sha256_chaikovskyiPablo.key');

const presentationBuffer = fs.readFileSync(pathToPresentation);
const changedPresentationBuffer = fs.readFileSync(pathToChangedPresentation);

const hash0 = sha256(presentationBuffer);
const hash1 = sha256(changedPresentationBuffer);

if (hash0 !== initHashes.just || hash1 !== initHashes.changed) {
  console.warn('Presentation hash mismatch, probably one of the files been changed.');
}

console.log('Hashing...');
console.log('\n');

setTimeout(() => {
  console.log(`Presentation hash: ${hash0}
Presentation hash (one letter changed): ${hash1}

As you see, hashes are completely different.
`);
}, 1000);