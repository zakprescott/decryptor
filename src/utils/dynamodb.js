const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const { REGION, TABLE_NAME } = require('../config.js');

const client = new DynamoDBClient({ region: REGION });

const getItem = async (hashKey) => {
    const params = {
        TableName : TABLE_NAME,
        Key: {
            hashKey: {
                S: hashKey
            }
        }
    };
    const command = new GetItemCommand(params);

    try {
        const { Item } = await client.send(command);
        return unmarshall(Item);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getItem };