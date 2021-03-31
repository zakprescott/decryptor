echo 'Deleting S3 buckets...'
aws s3 rb s3://decryptor-encrypted-files-$ENV --force
aws s3 rb s3://decryptor-decrypted-files-$ENV --force

echo 'Deleting log groups...'
aws logs delete-log-group --log-group-name /aws/lambda/decryptor-$ENV

echo 'Deleting stack...'
aws cloudformation delete-stack \
    --stack-name decryptor-stack-$ENV

aws cloudformation wait stack-delete-complete \
    --stack-name decryptor-stack-$ENV

echo 'Stack has been deleted successfully'