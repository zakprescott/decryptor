const s3Event = require('../resources/s3Event.json');
const { handler } = require('../../src/index.js');
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