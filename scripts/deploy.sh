echo 'Creating deploy bucket...'
aws s3api create-bucket --bucket decryptor-deploy-bucket-$ENV --region us-east-1

echo 'Uploading stack template to S3...'
aws s3 cp ./stack/decryptor-stack.yaml s3://decryptor-deploy-bucket-$ENV/stack/decryptor-stack.yaml

echo 'Creating stack...'
aws cloudformation create-stack \
    --stack-name decryptor-stack-$ENV \
    --template-body file://./stack/decryptor-stack.yaml \
    --capabilities CAPABILITY_NAMED_IAM \
    --parameters file://./.local/$ENV.properties

aws cloudformation wait stack-create-complete --stack-name decryptor-stack-$ENV

echo 'Stack created successfully'

echo 'Adding notification configuration for encrypted files S3 bucket...'
aws s3api put-bucket-notification-configuration \
    --bucket decryptor-encrypted-files-$ENV \
    --notification-configuration file://./stack/encryptedBucketNotificationConfiguration.json

echo 'Deploy complete'