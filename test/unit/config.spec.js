const {
  DECRYPTED_BUCKET,
  ENCRYPTED_BUCKET,
  REGION,
  TABLE_NAME,
  TEST_BUCKET,
} = require("../../src/config.js");

describe("config", () => {
  it.each`
    configVariable        | configValue         | expectedValue
    ${"DECRYPTED_BUCKET"} | ${DECRYPTED_BUCKET} | ${/^decryptor-decrypted-files-(.*)$/}
    ${"ENCRYPTED_BUCKET"} | ${ENCRYPTED_BUCKET} | ${/^decryptor-encrypted-files-(.*)$/}
    ${"REGION"}           | ${REGION}           | ${"us-east-1"}
    ${"TABLE_NAME"}       | ${TABLE_NAME}       | ${/^decryptor-cipher-table-(.*)$/}
    ${"TEST_BUCKET"}      | ${TEST_BUCKET}      | ${/^decryptor-test-bucket-(.*)$/}
  `(
    "should match $expectedValue for $configVariable",
    ({ configValue, expectedValue }) => {
      expect(configValue).toMatch(expectedValue);
    }
  );
});
