const { Readable } = require('stream');
const { 
    S3Client, 
    DeleteObjectCommand, 
    GetObjectCommand, 
    HeadObjectCommand,
    PutObjectCommand
} = require('@aws-sdk/client-s3');
const { REGION } = require('../config.js');
const client = new S3Client({ region: REGION });

const deleteObject = async (Bucket, Key) => {
    const params = { Bucket, Key };
    const command = new DeleteObjectCommand(params);

    try {
        await client.send(command);
    } catch (error) {
        console.log(`deleteObject: ${error}`);
    }
};

const getObject = async (Bucket, Key) => {
    const params = { Bucket, Key };
    const command = new GetObjectCommand(params);

    try {
        const { Body } = await client.send(command);
        const data = await readableToString(Readable.from(Body));
        return data;
    } catch (error) {
        console.log(`Error getting object ${Bucket}/${Key}: ${error}`);
    }
};

const headObject = async (Bucket, Key) => {
    const params = { Bucket, Key };
    const command = new HeadObjectCommand(params);

    try {
        const data = await client.send(command);
        return data;
    } catch (error) {
        console.log(`headObject: ${Bucket}/${Key} ${error}`);
    }
}

const putObject = async (Body, Bucket, Key) => {
    const params = { Body, Bucket, Key };
    const command = new PutObjectCommand(params);

    try {
        await client.send(command);
    } catch (error) {
        console.log(`Error putting object ${Bucket}/${Key}: ${error}`);
    }
};

const waitForObjectExists = async (Bucket, Key) => {
    let result;
    do {
        result = await headObject(Bucket, Key);
    } while (!result);
};

const waitForObjectNotExists = async (Bucket, Key) => {
    let result;
    do {
        result = await headObject(Bucket, Key);
    } while (result);
};

const readableToString = async (readable) => {
    let result = '';
    for await (const chunk of readable) {
        result += chunk;
    }
    return result;
};

module.exports = { 
    deleteObject, 
    getObject, 
    putObject, 
    waitForObjectExists, 
    waitForObjectNotExists 
};