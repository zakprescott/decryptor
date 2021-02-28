const { deleteObject, getObject, putObject, waitForObjectExists, waitForObjectNotExists } = require('../../../src/utils/s3.js');
const { TEST_BUCKET: Bucket } = require('../../../src/config.js');

describe('s3', () => {
    const Body = 'Ifmmp, xpsme!';
    const Key = 's3-test.txt';

    beforeAll(async () => {
        await putObject(Body, Bucket, Key);
        await waitForObjectExists(Bucket, Key);
    });
    
    afterAll(async () => {
        await deleteObject(Bucket, Key);
        await waitForObjectNotExists(Bucket, Key);
    });

    it('should get the contents of an S3 object when given a Bucket and Key', async () => {
        expect(await getObject(Bucket, Key)).toEqual(Body);
    });
});