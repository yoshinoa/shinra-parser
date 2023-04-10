import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import withAuth from "@/components/withAuth";
import { get_json } from "@/firebase/storage";
import parse_data from "@/utils/parser";
import IconRender from "@/components/SkillOutput";
import styles from "@/styles/JsonHash.module.css";

export function JsonLog() {
  const router = useRouter();
  const mgicon_prefix = "https://storage.googleapis.com/mg-res/icons";
  const [logData, setLogData] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  const [dungeonName, setDungeonName] = useState(null);
  const [bossId, setBossId] = useState(null);
  const [parsedSkills, setParsedSkills] = useState(null);
  const [time, setTime] = useState(0);
  const { jsonHash } = router.query;

  useEffect(() => {
    async function fetchLogData() {
      if (jsonHash) {
        const url = await get_json(jsonHash);
        try {
          const response = await fetch(url);
          const jsonData = await response.json();
          setLogData(jsonData);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchLogData();
  }, [jsonHash]);

  useEffect(() => {
    async function parse_async() {
      const parsedData = await parse_data(logData);
      setParsedSkills(parsedData);
    }
    if (logData) {
      setPlayerName(logData.players[0].playerName);
      setDungeonName(logData.areaId);
      setBossId(logData.bossId);
      parse_async();
    }
  }, [logData]);

  function handleTimeChange(event) {
    setTime(event.target.value);
  }

  return (
    <div className={styles["main"]}>
      <div className={styles["header"]}>
        <h1 className={styles["title"]}>Shinra Parser</h1>
        <div className={styles["timediv"]}>
          <p className={styles["description"]}>Time</p>
          <input
            type="number"
            name="quantity"
            min="1"
            max="999"
            value={time}
            onChange={handleTimeChange}
          />
        </div>
        <p className={styles["description"]}>Skill Usage</p>
      </div>
      <div>
        <p className={styles["playername"]}>{playerName}</p>
        <p>Dungeon Name: {dungeonName}</p>
        <p>BossId: {bossId}</p>
      </div>
      <div>
        {parsedSkills ? (
          <IconRender
            time={time}
            logData={logData}
            parsedSkills={parsedSkills}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default withAuth(JsonLog);
