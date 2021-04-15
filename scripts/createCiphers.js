const createCipherItem = require('../src/helpers/createCipherItem.js');
const { putItem } = require('../src/utils/dynamodb.js');

const createCiphers = async () => {
	for (let i = -26; i <= 26; i++) {
		await putItem(createCipherItem(i));
	}
};

createCiphers();
