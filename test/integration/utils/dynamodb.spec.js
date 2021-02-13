const { getItem } = require('../../../src/utils/dynamodb.js');

describe('dynamodb', () => {
    describe('getItem', () => {
        it('should return the correct Item when given a hashKey', async () => {
            const hashKey = 'bcdef';
            const Item = {
                hashKey: 'bcdef',
                cipher: {
                    b: 'a',
                    c: 'b',
                    d: 'c',
                    e: 'd',
                    f: 'e'
                }
            };
            expect(await getItem(hashKey)).toStrictEqual(Item);
        });
    });
});