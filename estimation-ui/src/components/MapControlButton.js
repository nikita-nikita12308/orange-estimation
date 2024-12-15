import React from "react";
import "./MapControlButton.css"; // Import the CSS file

const MapControlButton = ({ onChangeMapType, selectedMap }) => {
  const options = [
    { label: "Basic", imgSrc: "/images/basic-map.png", type: "basic" },
    {
      label: "Black & White",
      imgSrc: "/images/black-white-map.png",
      type: "bw",
    },
    {
      label: "Open Street Map",
      imgSrc: "/images/open-street-map.png",
      type: "osm",
    },
  ];

  return (
    <div className="control-container">
      {options.map((option) => (
        <button
          key={option.type}
          onClick={() => onChangeMapType(option.type)}
          className={`map-control-button ${
            selectedMap === option.type ? "selected" : ""
          }`}
        >
          <img src={option.imgSrc} alt={option.label} />
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MapControlButton;
