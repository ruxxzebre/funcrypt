const EC = require("elliptic").ec;

const ec = new EC("secp256k1");

const generatePair = () => ec.genKeyPair();
const formatPair = (key) => ({
  public: key.getPublic("hex"),
  private: key.getPrivate("hex"),
});

module.exports.generatePair = generatePair;
module.exports.formatPair = formatPair;
