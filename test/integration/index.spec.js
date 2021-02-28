const { deleteItem, putItem } = require('../../src/utils/dynamodb.js');
const { deleteObject, getObject, putObject, waitForObjectExists } = require('../../src/utils/s3.js');
const { DECRYPTED_BUCKET, ENCRYPTED_BUCKET } = require('../../src/config.js');
const cipherItem = require('../resources/cipherItem.json');
const encryptedBody = require('../resources/encryptedData.json');


describe('handler', () => {
    jest.setTimeout(30000);

    const decryptedBody = 'Hello, world!';
    const Key = 'hello-world.json';

    beforeAll(async () => {
        await putItem(cipherItem);
    });

    afterAll(async () => {
        await deleteItem(cipherItem.hashKey);
        await deleteObject(ENCRYPTED_BUCKET, Key);
        await deleteObject(DECRYPTED_BUCKET, Key);
    });

    it('should decrypt the file referenced in S3 event and store the decrypted file in S3', async () => {
        await putObject(JSON.stringify(encryptedBody), ENCRYPTED_BUCKET, Key);
        await waitForObjectExists(DECRYPTED_BUCKET, Key);
        expect(await getObject(DECRYPTED_BUCKET, Key)).toEqual(decryptedBody);
    });
});

