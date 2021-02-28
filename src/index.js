const { getBucketName, getObjectKey } = require('./helpers.js');
const { getObject, putObject } = require('./utils/s3.js');
const decrypt = require('./decrypt.js');
const { DECRYPTED_BUCKET } = require('./config.js');

exports.handler = (event) => {
    const { Records } = event;
    Records.forEach(async (record) => {
        const encryptedBucket = getBucketName(record);
        const Key = getObjectKey(record);
        const encryptedData = await getObject(encryptedBucket, Key);
        const decryptedData = await decrypt(JSON.parse(encryptedData));
        await putObject(decryptedData, DECRYPTED_BUCKET, Key);
    });
};