const decrypt = require('../../src/decrypt.js');
const { getItem } = require('../../src/utils/dynamodb.js');
const encryptedData = require('../resources/encryptedData.json');
const cipherItem = require('../resources/cipherItem.json');

jest.mock('../../src/utils/dynamodb.js');
getItem.mockResolvedValue(cipherItem);

describe('decrypt', () => {
	it('should decrypt encrypted data', async () => {
		expect(await decrypt(encryptedData)).toEqual('hello, world!');
	});
});
