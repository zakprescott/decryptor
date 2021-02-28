const { getItem } = require('./utils/dynamodb.js');

const decrypt = async (data) => {
    const { key: hashKey, message } = data;
    try {
        const { cipher } = await getItem(hashKey);
        const decryptedMessage = [...message].map(character => cipher[character] ? cipher[character] : character);
        return decryptedMessage.join('');
    } catch (error) {
        console.log(error);
    }
};

module.exports = decrypt;