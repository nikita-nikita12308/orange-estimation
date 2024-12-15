const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const fs = require("fs");
const path = require("path");
const { error } = require("console");
const http = require("http");
const socketIo = require("socket.io");
const {
  getBlockInfo,
  getBlockDataForMap,
} = require("./controllers/blockController");
const { getMapData } = require("./controllers/mapController");
const { processPhoto } = require("./services/pointService");
const calculateMetrics = require("./services/plotService");
const savePlotDataToDatabase = require("./repository/plotRepository");

const db = require("./config/database");
const Point = require("./models/Point");
const Plot = require("./models/Plot");

const pLimit = require("p-limit");
const limit = pLimit(2);

const app = express();
const server = http.createServer(app); // Створюємо сервер

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Your React app's URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

const PORT = 8000;

app.use(cors());

app.get("/handle-photo/:blockId", (req, res) => {
  const blockId = req.params.blockId;
  console.log(`${blockId} is starting processing`);

  const photosDir = path.join(__dirname, `photos/${blockId}`);

  res.json({ message: "Processing started" });

  const files = fs
    .readdirSync(photosDir)
    .filter((file) => file.endsWith("jpg") || file.endsWith(".png"));

  if (files.length === 0) {
    io.emit("processing-status", { status: "No photos found", blockId });
    return;
  }

  io.emit("processing-status", { status: "Processing Started", blockId });

  (async () => {
    try {
      for (let [index, file] of files.entries()) {
        await limit(() =>
          processPhoto(file, photosDir, blockId).then(() => {
            io.emit("processing-status", {
              status: `Processed file ${file}`,
              fileName: file,
              progress: ((index + 1) / files.length) * 100,
              blockId,
            });
          })
        );
      }

      io.emit("processing-status", { status: "Calculating data", blockId });

      const plot = await Plot.findOne({ name: blockId });
      console.log(plot);
      const pointsData = await Point.find({ plotId: plot._id });
      console.log(pointsData);
      const calculatedData = calculateMetrics(pointsData);
      console.log(calculatedData);

      await savePlotDataToDatabase({
        _id: plot._id,
        ...calculatedData,
      });

      io.emit("processing-status", { status: "Processing complete", blockId });
    } catch (error) {
      console.error("Error during processing:", error);
      io.emit("processing-status", {
        status: "Error processing data",
        blockId,
      });
    }
  })();
});

app.get("/block-info", getBlockInfo);

app.get("/block-data/:blockId", getBlockDataForMap);

app.get("/map-data/:blockId", getMapData);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
