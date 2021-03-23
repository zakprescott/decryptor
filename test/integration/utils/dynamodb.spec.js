const { deleteItem, getItem, putItem } = require('../../../src/utils/dynamodb.js');
const cipherItem = require('../../resources/cipherItem.json');

describe('dynamodb', () => {
    cipherItem.hashKey = 'dynamodb-test';

    beforeEach(async () => {
        await deleteItem(cipherItem.hashKey);
    });

    afterAll(async () => {
        await deleteItem(cipherItem.hashKey);
    });

    describe('deleteItem', () => {
        it('should delete an Item', async () => {
            await putItem(cipherItem);
            expect(await getItem(cipherItem.hashKey)).toStrictEqual(cipherItem);
            
            await deleteItem(cipherItem.hashKey);
            expect(await getItem(cipherItem.hashKey)).toBeUndefined();
        });
    });

    describe('getItem', () => {
        it('should get an Item', async () => {
            await putItem(cipherItem);
            expect(await getItem(cipherItem.hashKey)).toStrictEqual(cipherItem);
        });
    });

    describe('putItem', () => {
        it('should put an Item', async () => {
            await putItem(cipherItem);
            expect(await getItem(cipherItem.hashKey)).toStrictEqual(cipherItem);
        });
    });
});