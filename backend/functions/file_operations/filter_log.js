function filter_log(fileBuffer, playerName) {
  // Convert the buffer to a string
  const fileDataString = fileBuffer.toString();

  // Parse the JSON data from the string
  const jsonData = JSON.parse(fileDataString);

  // Filter the players array to only include the requested player
  const filteredPlayers = jsonData.players.filter(
    (player) => player.playerName === playerName
  );

  // Update the JSON data to only include the filtered players array
  jsonData.players = filteredPlayers;

  // Return the updated JSON data
  return jsonData;
}

exports.filter_log = filter_log;
