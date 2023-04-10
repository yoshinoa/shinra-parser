const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const SparkMD5 = require("spark-md5");
const { validate_log } = require("./file_operations/validate_log");
const { filter_log } = require("./file_operations/filter_log");

admin.initializeApp();

const cors = require("cors")({ origin: true });

exports.uploadLog = functions.https.onCall(async (data, context) => {
  const file = data.file;
  const playerName = data.playerName;

  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  // Validate the log file
  const validation = validate_log(file, playerName);
  if (!validation.status) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      validation.message
    );
  }

  // Filter the log file
  const filteredLog = filter_log(file, playerName);

  const stringifiedLog = JSON.stringify(filteredLog);

  // Compute the MD5 hash of the filtered log file
  const md5 = SparkMD5.ArrayBuffer.hash(stringifiedLog);

  // Create a Firebase Storage reference
  const storageRef = admin.storage().bucket().file(`log/${md5}.json`);

  storageRef.exists().then(async (exists) => {
    if (exists[0]) {
      return { message: "Log already exists", md5: md5 };
    } else {
      console.log(JSON.stringify(filteredLog));
      storageRef.save(filteredLog);
      return { message: "Log uploaded", md5: md5 };
    }
  });
  return { message: "Log uploaded", md5: md5 };
});
