export function getColorForOrangeCount(orangeCount, maxCount) {
  if (orangeCount === 0) {
    return { color: "#aaaaaa", threshold: 0 };
  }

  if (orangeCount === maxCount) {
    return { color: "#ff0000", threshold: 1 };
  }

  const ratio = orangeCount / maxCount;

  const thresholds = [
    { threshold: 0.8, color: "#ffa700" },
    { threshold: 0.6, color: "#fff400" },
    { threshold: 0.5, color: "#a3ff00" },
    { threshold: 0.4, color: "#2cba00" },
    { threshold: 0.3, color: "#005699" },
    { threshold: 0.2, color: "#5304d4" },
  ];

  // Знаходимо перший відповідний поріг
  for (let i = 0; i < thresholds.length; i++) {
    if (ratio >= thresholds[i].threshold) {
      return { color: thresholds[i].color, threshold: thresholds[i].threshold };
    }
  }

  return { color: "#5304d4", threshold: 0.1 }; // Default color and threshold
}
