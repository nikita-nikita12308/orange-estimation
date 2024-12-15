import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useParams } from "react-router-dom";
import { getColorForOrangeCount } from "../utils/colorMapper";

const MapElement = ({ selectedMap }) => {
  const { blockId } = useParams();
  const [map, setMap] = useState(null);
  const [overlayLayer, setOverlayLayer] = useState(null);
  const [pointsLayer, setPointsLayer] = useState(null);
  const [imageBounds, setImageBounds] = useState(null);
  const [imageSources, setImageSources] = useState(null);

  // Initialize the map only once
  useEffect(() => {
    const initialMap = L.map("map", {
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
      scrollWheelZoom: true,
      boxZoom: true,
      keyboard: true,
    }).setView([35.43633270315531, 23.917265407390303], 19);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 22,
      attribution: "© OpenStreetMap contributors",
    }).addTo(initialMap);

    setMap(initialMap);

    return () => {
      initialMap.remove();
    };
  }, []);

  // Fetch imageBounds and imageSources from the server based on blockId
  useEffect(() => {
    if (!blockId) return;

    fetch(`http://localhost:8000/block-data/${blockId}`)
      .then((response) => response.json())
      .then((data) => {
        setImageBounds(data.imageBounds);
        setImageSources(data.imagesSources);
      })
      .catch((error) => console.error("Error fetching block data:", error));
  }, [blockId]);

  // Update the map overlay based on selectedMap and fetched imageBounds/imageSources
  useEffect(() => {
    if (!map || !imageBounds || !imageSources) return;

    if (overlayLayer) {
      overlayLayer.remove();
    }

    const selectedImage = imageSources[selectedMap];
    if (selectedImage) {
      const newOverlay = L.imageOverlay(selectedImage, imageBounds);
      newOverlay.addTo(map);
      setOverlayLayer(newOverlay);
    } else {
      setOverlayLayer(null);
    }
  }, [selectedMap, map, imageBounds, imageSources]);

  // Fetch and display points data from server
  useEffect(() => {
    if (!map || !blockId) return;

    fetch(`http://localhost:8000/map-data/${blockId}`)
      .then((response) => response.json())
      .then((data) => {
        const pointsGroup = L.layerGroup();
        const maxOranges = data.maxValue;

        data.pointsData.forEach((point) => {
          const { numberOfOranges, imageUrl, latitude, longitude } = point;
          const { color, threshold } = getColorForOrangeCount(
            numberOfOranges,
            maxOranges
          );

          const popupContent = document.createElement("div");
          popupContent.style.fontFamily = "Arial, sans-serif";
          popupContent.style.fontSize = "14px";
          popupContent.style.color = "#333";
          popupContent.style.width = "200px";

          const colorDiv = document.createElement("div");
          colorDiv.innerHTML = `<strong>Value:</strong> ${threshold} <span style="color: ${color}; font-size: 25px; font-weight: bold;">&#8226;</span>`;
          popupContent.appendChild(colorDiv);

          const orangesDiv = document.createElement("div");
          orangesDiv.innerHTML = `<strong>Oranges:</strong> <span>${numberOfOranges}</span>`;
          popupContent.appendChild(orangesDiv);

          const imageDiv = document.createElement("div");
          imageDiv.style.marginTop = "10px";
          const image = document.createElement("img");
          image.src = imageUrl;
          image.alt = "Point Image";
          image.style.width = "100%";
          image.style.height = "auto";
          image.style.borderRadius = "8px";
          image.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
          imageDiv.appendChild(image);
          popupContent.appendChild(imageDiv);

          const marker = L.circleMarker([latitude, longitude], {
            color: color,
            radius: 8,
            fillOpacity: 0.8,
          }).bindPopup(popupContent);

          pointsGroup.addLayer(marker);
        });

        if (pointsLayer) {
          pointsLayer.clearLayers();
        }
        pointsGroup.addTo(map);
        setPointsLayer(pointsGroup);
      })
      .catch((error) => console.error("Error loading map data:", error));

    return () => {
      if (pointsLayer) {
        pointsLayer.clearLayers();
      }
    };
  }, [map, blockId]);

  return (
    <div
      id="map"
      style={{
        height: "100vh",
        width: "100%",
        zIndex: 1,
        position: "relative",
      }}
    ></div>
  );
};

export default MapElement;
