import { useState, useRef } from "react";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { upload_log } from "@/firebase/functions";
import LogoutButton from "@/components/Logout";
import withAuth from "@/components/withAuth";

import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Upload() {
  const [file, setFile] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [logError, setLogError] = useState(null);
  const [fileExists, setFileExists] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      const logContents = e.target.result;

      upload_log(logContents, playerName)
        .then((res) => {
          console.log(res);
          router.push("/log/" + res.data.md5);
        })
        .catch((err) => {
          setLogError(err.message);
        });
    };

    fileReader.readAsText(file);
  };

  const handleChooseFileClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={styles["upload-container"]}>
      <div className={styles["top-right"]}>
        <LogoutButton />
      </div>

      <form className={styles["upload-form"]} onSubmit={handleFileUpload}>
        <input
          className={styles["upload-input"]}
          type="text"
          placeholder="Player Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <label htmlFor="file" className={styles["upload-input-label"]}>
          <FontAwesomeIcon icon={faUpload} /> Choose file
          <input
            type="file"
            id="file"
            className={styles["upload-input-hidden"]}
            ref={fileInputRef}
            onChange={(e) => {
              setFile(e.target.files[0]);
              setFileName(e.target.files[0].name);
            }}
          />
        </label>
        <span className={styles["upload-selected-file"]}>{fileName}</span>
        {logError && (
          <p className={styles["upload-error"]}>{logError.toString()}</p>
        )}
        <button className={styles["upload-button"]} type="submit">
          Upload
        </button>
      </form>
    </div>
  );
}

export default withAuth(Upload);
