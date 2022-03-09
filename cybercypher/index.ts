const alphabetLC = "abcdefghijklmnopqrstuvwxyz";
const alphabetUC = alphabetLC.toUpperCase();
const specials = {
  SPACE: {
    code: 32,
    symbol: " ",
  },
};

const OFFSET = 666;
const getAlphPos = (c: string | number, k = 0): number => {
  const charCode = typeof c === "string" ? c.charCodeAt(0) : c;
  let ret;
  if (charCode >= 65 && charCode <= 90) {
    ret = ((charCode % 65) + k) % alphabetUC.length;
  } else if (charCode >= 97 && charCode <= 122) {
    ret = ((charCode % 97) + k) % alphabetUC.length;
  } else {
    ret = charCode + OFFSET;
  }
  return ret;
};

const getCharByCode = (c: number) =>
  alphabetLC[c] || String.fromCharCode(c - OFFSET);

const shiftChar = (c: string, k: number): string => {
  const charCode = c.charCodeAt(0);
  if (charCode === specials.SPACE.code) return specials.SPACE.symbol;
  if (charCode >= 65 && charCode <= 90) return alphabetUC[getAlphPos(c, k)];
  return alphabetLC[getAlphPos(c, k)];
};

type Ceasare = {
  encrypt: (i: string, shift: number) => string;
  decrypt: (i: string, shift: number) => string;
};

const ceasare: Partial<Ceasare> = {};

ceasare.encrypt = (i, shift) =>
  i
    .split("")
    .map((j) => shiftChar(j, shift))
    .join("");
ceasare.decrypt = (i, shift) =>
  i
    .split("")
    .map((j) => shiftChar(j, alphabetLC.length - shift))
    .join("");

type Vigenere = {
  encrypt: (i: string, key: string) => string;
  decrypt: (i: string, key: string) => string;
};

const vigenere: Partial<Vigenere> = {};

function vigenereCipher(phrase: string, key: string, encrypt: boolean) {
  let keyArray: number[] = key.split('').map(c => findOffset(c));
  let letters: number[] = [];

  let c = 0;
  for (let i = 0; i < phrase.length; i++) {
    let charCode: number = phrase[i].charCodeAt(0);
    if (((97 <= charCode) && (charCode <= 122)) || ((65 <= charCode) && (charCode <= 90))) {
      letters.push(letterShift(phrase[i], keyArray[c % keyArray.length], encrypt));
      c++;
    } else {
      letters.push(charCode);
    }
  }

  return String.fromCharCode(...letters);
}

function letterShift(letter: string, shift: number, forward: boolean) {
  shift = forward ? shift : -1 * shift;
  let charCode: number = letter.charCodeAt(0);
  if ((65 <= charCode) && (charCode <= 90)) {
    charCode = 65 + ((charCode + shift - 65 + 26) % 26);
  } else if ((97 <= charCode) && (charCode <= 122)) {
    charCode = 97 + ((charCode + shift - 97 + 26) % 26);
  }
  return charCode;
}

function findOffset(letter: string) {
  let charCode: number = letter.charCodeAt(0) - 65;
  charCode = (charCode > 32) ? charCode - 32 : charCode;
  return charCode % 26;
}

vigenere.encrypt = (i, k) => {
  return vigenereCipher(i, k, false);
};

vigenere.decrypt = (i, k) => {
  return vigenereCipher(i, k, false);
};
