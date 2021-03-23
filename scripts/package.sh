echo 'Creating deploy bucket...'
aws s3api create-bucket --bucket decryptor-deploy-bucket --region us-east-1

echo 'Removing local package if it exists...'
rm -f -- decryptor.zip

echo 'Packaging source code...'
zip -r decryptor.zip . -i 'src/*' 'node_modules/*' --quiet

echo 'Uploading package to S3...'
aws s3 cp decryptor.zip s3://decryptor-deploy-bucket/code/decryptor.zip --quiet

echo 'Removing local package...'
rm -f -- decryptor.zip

echo 'Packaging complete'