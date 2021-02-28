const decrypt = require('../../src/decrypt.js');
const { deleteItem, putItem } = require('../../src/utils/dynamodb.js');
const encryptedData = require('../resources/encryptedData.json');
const cipherItem = require('../resources/cipherItem.json');

describe('decrypt', () => {
    beforeAll(async () => {
        cipherItem.hashKey = 'decrypt-test';
        encryptedData.key = cipherItem.hashKey;
        await putItem(cipherItem);
    });
    
    afterAll(async () => {
        await deleteItem(cipherItem.hashKey);
    });

    it('should decrypt encrypted data', async () => {
        expect(await decrypt(encryptedData)).toEqual('Hello, world!');
    });
});