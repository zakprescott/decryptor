rm -f -- decryptor.zip

zip -r decryptor.zip .

aws s3 cp decryptor.zip s3://decryptor-deploy-bucket/decryptor.zip

aws lambda delete-function --function-name decryptor \
--cli-binary-format raw-in-base64-out

aws lambda create-function --function-name decryptor \
--zip-file fileb://decryptor.zip --handler src/index.handler --runtime nodejs14.x \
--timeout 30 --memory-size 1024 \
--role arn:aws:iam::642744795524:role/decryptor-role \
--cli-binary-format raw-in-base64-out

rm -f -- decryptor.zip