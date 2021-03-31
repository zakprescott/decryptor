const { getBucketName, getObjectKey } = require("../../src/helpers.js");
const s3Event = require("../resources/s3Event.json");

describe("helpers", () => {
  describe("getBucketName", () => {
    it("should get the bucket name from an S3 event record", () => {
      const [record] = s3Event.Records;
      expect(getBucketName(record)).toEqual("decryptor-encrypted-files");
    });
  });

  describe("getObjectKey", () => {
    it("should get the object key from an S3 event record", () => {
      const [record] = s3Event.Records;
      expect(getObjectKey(record)).toEqual("hello-world.txt");
    });
  });
});
