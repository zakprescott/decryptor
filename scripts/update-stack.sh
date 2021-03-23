echo 'Updating stack...'
aws cloudformation update-stack \
    --stack-name decryptor-stack \
    --template-body file://./stacks/decryptor-stack.yaml \
    --capabilities CAPABILITY_NAMED_IAM

aws cloudformation wait stack-update-complete \
    --stack-name decryptor-stack

'Stack update complete'