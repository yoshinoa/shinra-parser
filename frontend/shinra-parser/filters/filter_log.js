export default async function filter_log(file, playerName) {
  // Create a FileReader object to read the file data
  const fileReader = new FileReader();

  // Use a Promise to wait for the file to be loaded
  const fileDataPromise = new Promise((resolve, reject) => {
    fileReader.onload = () => {
      try {
        // Parse the JSON data from the file
        const jsonData = JSON.parse(fileReader.result);
        // Filter the players array to only include the requested player
        const filteredPlayers = jsonData.players.filter(
          (player) => player.playerName === playerName
        );
        // Update the JSON data to only include the filtered players array
        jsonData.players = filteredPlayers;
        // Resolve the promise with the updated JSON data
        resolve(jsonData);
      } catch (error) {
        // Reject the promise with the error
        reject(error);
      }
    };
    fileReader.onerror = () => {
      // Reject the promise with the error
      reject(fileReader.error);
    };
  });

  // Read the file data as text
  fileReader.readAsText(file);

  // Wait for the Promise to resolve or reject
  const fileData = await fileDataPromise;

  // Return the updated JSON data
  return fileData;
}
