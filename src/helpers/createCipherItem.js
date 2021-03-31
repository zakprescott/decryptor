const alphabet = require("./alphabet.js");

const createCipherItem = (key = 0) => {
  const cipher = {};

  [...alphabet].forEach((letter) => {
    const letterIndex = alphabet.indexOf(letter);
    let substituteLetterIndex = letterIndex + key;
    if (substituteLetterIndex < 0) {
      substituteLetterIndex = alphabet.length + substituteLetterIndex;
    }
    if (substituteLetterIndex > 25) {
      substituteLetterIndex = substituteLetterIndex - alphabet.length;
    }
    const substituteLetter = alphabet.charAt(substituteLetterIndex);
    cipher[substituteLetter] = letter;
  });

  return {
    hashKey: key,
    cipher,
  };
};

module.exports = createCipherItem;
