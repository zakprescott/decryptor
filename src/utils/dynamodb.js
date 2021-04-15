const {
	DynamoDBClient,
	DeleteItemCommand,
	GetItemCommand,
	PutItemCommand,
} = require('@aws-sdk/client-dynamodb');
const { unmarshall, marshall } = require('@aws-sdk/util-dynamodb');
const { REGION, TABLE_NAME } = require('../config.js');

const client = new DynamoDBClient({ region: REGION });

const deleteItem = async (hashKey) => {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			hashKey: {
				N: hashKey.toString(),
			},
		},
	};
	const command = new DeleteItemCommand(params);

	try {
		const data = await client.send(command);
		return data;
	} catch (error) {
		console.log(error);
	}
};

const getItem = async (hashKey) => {
	const params = {
		TableName: TABLE_NAME,
		Key: {
			hashKey: {
				N: hashKey.toString(),
			},
		},
	};
	const command = new GetItemCommand(params);

	try {
		const { Item } = await client.send(command);
		return unmarshall(Item);
	} catch (error) {
		console.log(error);
	}
};

const putItem = async (Item) => {
	const params = {
		TableName: TABLE_NAME,
		Item: marshall(Item),
	};
	const command = new PutItemCommand(params);

	try {
		await client.send(command);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { deleteItem, getItem, putItem };
