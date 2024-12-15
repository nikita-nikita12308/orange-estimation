const mongoose = require("mongoose");
const path = require("path");
const { execFile } = require("child_process");
const Point = require("../models/Point");
const Plot = require("../models/Plot");

async function savePointData({ blockId, filename, orangesCount, outputPath }) {
  // Find plotId based on blockId
  const plot = await Plot.findOne({ name: blockId });
  if (!plot) throw new Error(`Plot not found for blockId: ${blockId}`);

  const plotId = plot._id;

  // Extract latitude and longitude from filename
  const [latitude, longitude] = filename.replace(".jpg", "").split(", ");

  const pointData = {
    plotId,
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    numberOfOranges: orangesCount,
    imageUrl: outputPath,
  };

  // Save to Point collection
  await Point.create(pointData);
  console.log(`Point data saved for ${filename}:`, pointData);
}

function processPhoto(filename, photosDir, blockId) {
  return new Promise((resolve, reject) => {
    const photopath = path.join(photosDir, filename);
    const scriptPath = path.resolve(__dirname, "../count_oranges.py");
    const startTime = Date.now();
    execFile(
      "python",
      [scriptPath, photopath, blockId],
      async (error, stdout, stderr) => {
        if (error) {
          console.error(`Error processing ${filename}:`, error);
          return reject(error);
        }

        console.log(stdout);

        const match = stdout.match(/oranges=(\d+)/);
        const pathMatch = stdout.match(/output_path=(.+)/);

        const orangesCount = parseInt(match[1], 10);
        const outputPath = pathMatch[1].trim();

        console.log(orangesCount);

        // Save the processed data to the database
        try {
          await savePointData({
            blockId,
            filename,
            orangesCount,
            outputPath,
          });
        } catch (err) {
          console.error("Error saving point data:", err);
          return reject(err);
        }

        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(`Processed ${filename}: ${stdout}`);
        console.log(`Processing ${filename} took ${duration} ms`);

        resolve({ filename, result: stdout.trim() });
      }
    );
  });
}

module.exports = { savePointData, processPhoto };
