const { getBucketName, getObjectKey } = require("./helpers.js");
const { getObject, putObject } = require("./utils/s3.js");
const decrypt = require("./decrypt.js");
const { DECRYPTED_BUCKET } = require("./config.js");

exports.handler = (event) => {
  console.log(`Event: ${JSON.stringify(event)}`);

  const { Records } = event;

  Records.forEach(async (record) => {
    console.log(`Processing record: ${JSON.stringify(record)}`);
    const encryptedBucket = getBucketName(record);
    const Key = getObjectKey(record);

    console.log(`Decrypting data from: ${encryptedBucket}/${Key}`);
    const encryptedData = await getObject(encryptedBucket, Key);
    console.log(`Encrypted data: ${encryptedData}`);

    const decryptedData = await decrypt(JSON.parse(encryptedData));
    console.log(`Decrypted data: ${decryptedData}`);

    await putObject(decryptedData, DECRYPTED_BUCKET, Key);
  });
};
