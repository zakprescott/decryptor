echo 'Deleting S3 buckets...'
aws s3 rb s3://decryptor-encrypted-files --force
aws s3 rb s3://decryptor-decrypted-files --force

echo 'Deleting log groups...'
aws logs delete-log-group --log-group-name /aws/lambda/decryptor

echo 'Deleting stack...'
aws cloudformation delete-stack \
    --stack-name decryptor-stack

aws cloudformation wait stack-delete-complete \
    --stack-name decryptor-stack

echo 'Stack has been deleted successfully'