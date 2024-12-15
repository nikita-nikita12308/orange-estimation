const Plot = require("../models/Plot");

async function savePlotDataToDatabase(plotData) {
  try {
    // Ensure fields are correctly mapped
    await Plot.updateOne(
      { _id: plotData._id }, // Find the document by _id
      {
        $set: {
          number_of_oranges: plotData.totalOranges,
          detected_trees: plotData.detectedTrees,
          undetected_trees: plotData.undetectedTrees,
          estimated_yield: plotData.estimatedYield,
          trees_number: plotData.treesNumber,
          oranges_per_tree: plotData.orangesPerTree,
          processed: true,
        },
      },
      { upsert: true } // Create the document if it doesn't exist
    );

    console.log("Plot summary data saved:", plotData);
  } catch (error) {
    console.error("Error saving plot summary data:", error);
  }
}

module.exports = savePlotDataToDatabase;
