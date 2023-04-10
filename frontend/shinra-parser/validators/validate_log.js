export default function validate_log(logContents, playerName) {
  // Parse the JSON data
  let logData;
  console.log(logContents);
  try {
    logData = JSON.parse(logContents);
  } catch (error) {
    console.error("Failed to parse log file:", error);
    return false;
  }

  // Validate the required properties
  const requiredProperties = [
    "areaId",
    "bossId",
    "encounterUnixEpoch",
    "fightDuration",
    "meterVersion",
    "partyDps",
    "mobs",
    "players",
  ];

  for (const prop of requiredProperties) {
    if (!logData.hasOwnProperty(prop)) {
      console.log(`Log is missing required property '${prop}'`);
      return false;
    }
  }

  const playerData = logData.players.find(
    (player) => player.playerName === playerName
  );
  if (!playerData) {
    console.log(`Log does not contain data for player '${playerName}'`);
    return false;
  }

  return true;
}
