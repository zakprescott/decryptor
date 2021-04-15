const cipherItem = require('../../resources/cipherItem.json');
const createCipherItem = require('../../../src/helpers/createCipherItem.js');

describe('createCipher', () => {
	it('should create a cipher when given 1 as a key', () => {
		expect(createCipherItem(1)).toEqual(cipherItem);
	});
});
