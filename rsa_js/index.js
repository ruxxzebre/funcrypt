const crypto = require("crypto");

let run;

module.exports = run = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        // The standard secure default length for RSA keys is 2048 bits
        modulusLength: 2048,
    });
    console.log("KEYS:");
    console.log(`${privateKey.export({
        format: "pem",
        type: "pkcs1"
    })}`)
    console.log(`${publicKey.export({
        format: "pem",
        type: "pkcs1"
    })}`)
    const data = "Chaikovskyi Pavlo";
    console.log(`Data is${data}`);
    console.log(`Encrypted: ${crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        // We convert the data string to a buffer using `Buffer.from`
        Buffer.from(data)
    ).toString("base64")}`);
};

run();