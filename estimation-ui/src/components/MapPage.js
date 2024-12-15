import React, { useState } from "react";
import MapElement from "./MapElement"; // Your map component
import MapControlButton from "./MapControlButton"; // Your control button component

const MapPage = () => {
  const [selectedMap, setSelectedMap] = useState("basic");

  // Function to handle map type changes
  const handleMapTypeChange = (newMapType) => {
    setSelectedMap(newMapType); // Update the selected map type
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh", // Ensure MapPage takes full height of viewport
        width: "100%",
        overflow: "hidden", // Prevent overflow scrollbars on the page
        margin: 0, // Remove any default margin that could cause overflow
      }}
    >
      <MapElement selectedMap={selectedMap} />
      <MapControlButton onChangeMapType={handleMapTypeChange} />
    </div>
  );
};

export default MapPage;
