const { ExportSummary } = require('@aws-sdk/client-dynamodb');
const { getItem } = require('./utils/dynamodb.js');

exports.handler = async (event, context, callback) => {
    console.log(event);
};