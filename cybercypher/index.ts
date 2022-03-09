const shiftChar = (c: string, k: number, direction: boolean, code = false): string | number => {
  k = direction ? k : - k;
  let charCode = c.charCodeAt(0);

  if (charCode >= 65 && charCode <= 90) {
    charCode = (charCode + k) % 90;
  } else if (charCode >= 97 && charCode <= 122) {
    charCode = (charCode + k) % 122;
  }
  return code ? charCode : String.fromCharCode(charCode);
};
// const charShift = (c: string, k: number, direction: boolean): string => shiftChar(c, k, direction) as string;
const codeShift = (c: string, k: number, direction: boolean): number => shiftChar(c, k, direction, true) as number;

function vigenereCipher(phrase: string, key: string, encrypt: boolean) {
  let keyArray: number[] = key.split('').map(c => findOffset(c));
  let letters: number[] = [];

  let c = 0;
  for (let i = 0; i < phrase.length; i++) {
    let charCode: number = phrase[i].charCodeAt(0);
    if (((97 <= charCode) && (charCode <= 122)) || ((65 <= charCode) && (charCode <= 90))) {
      letters.push(codeShift(phrase[i], keyArray[c % keyArray.length], encrypt));
      c++;
    } else {
      letters.push(charCode);
    }
  }

  return String.fromCharCode(...letters);
}

function findOffset(letter: string) {
  let charCode: number = letter.charCodeAt(0) - 65;
  charCode = (charCode > 32) ? charCode - 32 : charCode;
  return charCode % 26;
}

type Vigenere = {
  encrypt: (i: string, key: string) => string;
  decrypt: (i: string, key: string) => string;
};

type Ceasare = {
  encrypt: (i: string, shift: number) => string;
  decrypt: (i: string, shift: number) => string;
};

export const vigenere: Vigenere = {
  encrypt: (i, k) => {
    return vigenereCipher(i, k, false);
  },
  decrypt: (i, k) => {
    return vigenereCipher(i, k, false);
  }
};

export const ceasare: Ceasare = {
  encrypt: (i, shift) =>
    i
      .split("")
      .map((j) => shiftChar(j, shift, true))
      .join(""),
  decrypt: (i, shift) =>
    i
      .split("")
      .map((j) => shiftChar(j, shift, false))
      .join("")
};