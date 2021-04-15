const { getBucketName, getObjectKey } = require('./helpers/s3EventHelpers.js');
const { getObject, putObject } = require('./utils/s3.js');
const decrypt = require('./decrypt.js');
const { DECRYPTED_BUCKET } = require('./config.js');

const handler = (s3Event) => {
	const { Records } = s3Event;
	Records.forEach(async (s3EventRecord) => {
		await putDecryptedDataToS3(s3EventRecord);
	});
};

const putDecryptedDataToS3 = async (s3EventRecord) => {
	const { encryptedData, Key } = await getEncryptedDataWithKey(s3EventRecord);
	const decryptedData = await decrypt(encryptedData);
	await putObject(decryptedData, DECRYPTED_BUCKET, Key);
};

const getEncryptedDataWithKey = async (s3EventRecord) => {
	const { Bucket, Key } = getBucketAndKey(s3EventRecord);
	const encryptedData = await getObject(Bucket, Key);
	return {
		encryptedData: JSON.parse(encryptedData),
		Key,
	};
};

const getBucketAndKey = (s3EventRecord) => {
	return {
		Bucket: getBucketName(s3EventRecord),
		Key: getObjectKey(s3EventRecord),
	};
};

module.export = {
	handler,
	putDecryptedDataToS3,
	getEncryptedDataWithKey,
	getBucketAndKey
};