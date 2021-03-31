const getBucketName = (record) => {
  return record.s3.bucket.name;
};

const getObjectKey = (record) => {
  return record.s3.object.key;
};

module.exports = { getBucketName, getObjectKey };
