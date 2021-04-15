const s3Event = require('../resources/s3Event.json');
const { handler, getBucketAndKey } = require('../../src/index.js');
const { getItem } = require('../../src/utils/dynamodb.js');
const { getObject, putObject } = require('../../src/utils/s3.js');
const encryptedData = require('../resources/encryptedData.json');
const cipherItem = require('../resources/cipherItem.json');

jest.mock('../../src/utils/dynamodb.js');
getItem.mockResolvedValue(cipherItem);

jest.mock('../../src/utils/s3.js');
getObject.mockResolvedValue(JSON.stringify(encryptedData));
putObject.mockImplementation();

describe('handler', () => {
	it('should decrypt the file referenced in the event and store the decrypted file in S3', () => {
		handler(s3Event);
	});
});

// describe('getEncryptedDataWithKey', async () => {
// 	it('should return an object with encryptedData and its corresponding S3 Key', () => {
// 		const [s3EventRecord] = s3Event.Records;
// 		const encryptedData = {
// 			'key': 1,
// 			'message': 'ifmmp, xpsme!'
// 		};
// 		const expected = {
// 			encryptedData,
// 			Key: 'hello-world.txt'
// 		};

// 		expect(await getEncryptedDataWithKey(s3EventRecord)).toEqual(expected);
// 	});
// });

describe.only('getBucketAndKey', () => {
	it('should return an object containing the S3 Bucket and Key extracted from an S3 event record', () => {
		const [s3EventRecord] = s3Event.Records;
		const expected = {
			Bucket: 'decryptor-encrypted-files',
			Key: 'hello-world.txt',
		};

		expect(getBucketAndKey(s3EventRecord)).toEqual(expected);
	});
});
