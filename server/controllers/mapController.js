const path = require("path");

const getMapData = (req, res) => {
  try {
    const blockId = req.params.blockId;
    console.log(blockId);
    res.status(200).sendFile(path.join(__dirname, "points.json"));
  } catch (err) {
    res.status(500).json({ message: "Error sending data", error: err.message });
  }
};

module.exports = { getMapData };
