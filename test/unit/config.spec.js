const { REGION, TABLE_NAME } = require('../../src/config.js');

describe('config', () => {
    it('should return values for REGION and TABLE_NAME', () => {
        expect(REGION).toBe('us-east-1');
        expect(TABLE_NAME).toBe('decryptor-key-table');
    });
});