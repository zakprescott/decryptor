echo 'Creating deploy bucket...'
aws s3api create-bucket --bucket decryptor-deploy-bucket --region us-east-1

echo 'Uploading stack template to S3...'
aws s3 cp ./stacks/decryptor-stack.yaml s3://decryptor-deploy-bucket/stacks/decryptor-stack.yaml

echo 'Creating stack...'
aws cloudformation create-stack \
    --stack-name decryptor-stack \
    --template-body file://./stacks/decryptor-stack.yaml \
    --capabilities CAPABILITY_NAMED_IAM

aws cloudformation wait stack-create-complete --stack-name decryptor-stack

echo 'Stack created successfully'

echo 'Adding notification configuration for encrypted files S3 bucket...'
aws s3api put-bucket-notification-configuration \
    --bucket decryptor-encrypted-files \
    --notification-configuration file://./stacks/encryptedBucketNotificationConfiguration.json

echo 'Deploy complete'