const fs = require('fs').promises;

async function writeToFile(filename, data) {
  try {
    await fs.writeFile(filename, JSON.stringify(data, null, 2));
    console.log(`${filename} has been written successfully.`);
  } catch (error) {
    console.error(`Error writing to ${filename}:`, error);
  }
}

module.exports = { writeToFile };
