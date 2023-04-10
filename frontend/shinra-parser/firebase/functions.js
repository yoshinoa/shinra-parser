import { app } from "./firebase";
import { getFunctions, httpsCallable } from "firebase/functions";
import { connectFunctionsEmulator } from "firebase/functions";

const functions = getFunctions(app);
// The Firebase Admin SDK to access the Firebase Realtime Database
// connectFunctionsEmulator(functions, "localhost", 5001);
//

export function upload_log(logContents, username) {
  const validateLog = httpsCallable(functions, "uploadLog");
  return validateLog({ file: logContents, playerName: username });
}
