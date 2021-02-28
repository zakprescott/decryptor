<h1 align="center">decryptor</h1>

<h3 align="center">
	Decrypt and store top-secret messages
</h3>

<div align="center">
    <img src="https://media.giphy.com/media/077i6AULCXc0FKTj9s/giphy.gif"></img>
</div>

# Overview
<div align="center">
    <img src="./decryptor.jpg"></img>
</div>

1. *Encrypted file* is uploaded to the **encrypted files** S3 bucket
2. File upload triggers the **decryptor** lambda function
3. The **decryptor** function determines the *cipher key* and retrieves the *cipher* from the DynamoDB **cipher table**
4. The **decryptor** function then decrypts the encrypted file using the cipher
5. The *decrypted file* is then uploaded to the **decrypted files** S3 bucket

## Prerequisites
* AWS Access
## Getting Started
```bash
npm i
```

```bash
npm test
```

## How It Works

## Running Tests
### Unit Tests
```bash
npm run test:unit
```
### Integration Tests
```bash
npm run test:integration
```