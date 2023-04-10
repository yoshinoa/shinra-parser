function validate_log(logContents, playerName) {
  // Parse the JSON data
  let logData;
  try {
    logData = JSON.parse(logContents);
  } catch (error) {
    return {
      message: "Log file is not valid JSON",
      status: false,
    };
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
      return {
        message: `Log file is missing a required property`,
        status: false,
      };
    }
  }

  const playerData = logData.players.find(
    (player) => player.playerName === playerName
  );
  if (!playerData) {
    return {
      message: `Log does not contain data for player '${playerName}'`,
      status: false,
    };
  }

  return {
    message: "Log file is valid",
    status: true,
  };
}

exports.validate_log = validate_log;
