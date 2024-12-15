const Plot = require("../models/Plot");

const getBlockInfo = async (req, res) => {
  try {
    // Query the database to get the necessary data
    const blocks = await Plot.find({}, "name processed imagesSources"); // Fetching name, processed, and imagesSources fields

    // Map through the blocks and format the response
    const formattedBlocks = blocks.map((block) => {
      // Select the image based on the processed field
      const image = block.processed
        ? block.imagesSources.basic
        : block.imagesSources.bw;

      // Return custom object with "id" instead of "name" and image based on processed status
      return {
        id: block.name, // Rename "name" to "id"
        image: image, // Set the image based on the processed status
        processed: block.processed, // Include processed status
      };
    });

    // Send the response with formatted data
    res.status(200).json({
      "plot-data": formattedBlocks,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching block data", error: err.message });
  }
};

// const getBlockInfo = (req, res) => {
//   try {
//     res.status(200).json({
//       "plot-data": [
//         { id: "Block 11", image: "map4.png", processed: true },
//         { id: "Block 12", image: "map2.png", processed: false },
//         { id: "Block 13", image: "map1.png", processed: true },
//         { id: "Block 14", image: "map3.png", processed: false },
//       ],
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Error sending data", error: err.message });
//   }
// };

const getBlockDataForMap = (req, res) => {
  try {
    const blockId = req.params.blockId;
    console.log(blockId);
    res.status(200).json({
      imageBounds: [
        [35.436688384569486, 23.915630609298653],
        [35.435434907217974, 23.919499330381104],
      ],
      imagesSources: {
        basic: "/map4.png",
        bw: "/map2.png",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error sending data", error: err.message });
  }
};

module.exports = { getBlockInfo, getBlockDataForMap };
