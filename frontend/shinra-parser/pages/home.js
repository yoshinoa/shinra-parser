import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import validate_log from "@/validators/validate_log";
import filter_log from "@/filters/filter_log";
import { db } from "@/firebase/firebase";
import SparkMD5 from "spark-md5";
import { useRouter } from "next/router";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [logError, setLogError] = useState(null);
  const [fileExists, setFileExists] = useState(false);
  const router = useRouter();

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      const logContents = e.target.result;

      // Validate the log
      const isValidLog = validate_log(logContents, playerName);
      if (!isValidLog) {
        setLogError("Invalid log file.");
        return;
      }

      const filteredLog = await filter_log(file, playerName);

      const blob = new Blob([JSON.stringify(filteredLog)], {
        type: "application/json",
      });

      const reader = new FileReader();
      reader.onload = async (e) => {
        const md5 = SparkMD5.ArrayBuffer.hash(e.target.result);
        console.log(md5); // log the MD5 hash
        // Create a Firebase Storage reference
        const storageRef = ref(getStorage(), "uploads/" + md5 + ".json");

        // Upload the file to Firebase Storage
        try {
          await uploadBytes(storageRef, blob);
        } catch (error) {
          router.push("/log/" + md5);
          return;
        }

        router.push("/log/" + md5);

        // Reset the file input
        setFile(null);
      };
      reader.readAsArrayBuffer(blob);
    };

    fileReader.readAsText(file);
  };

  return (
    <div>
      <form onSubmit={handleFileUpload}>
        <input
          type="text"
          placeholder="Player Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
