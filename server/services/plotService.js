function calculateMetrics(pointsData) {
  let totalOranges = 0;
  let detectedTrees = 0;
  let undetectedTrees = 0;

  pointsData.forEach((point) => {
    totalOranges += point.numberOfOranges;
    if (point.numberOfOranges > 0) {
      detectedTrees++;
    } else {
      undetectedTrees++;
    }
  });

  const treesNumber = detectedTrees + undetectedTrees;
  const orangesPerTree = treesNumber
    ? Math.round(totalOranges / treesNumber)
    : 0;
  const estimatedYield = calculateEstimatedYield(totalOranges, treesNumber);

  return {
    totalOranges,
    detectedTrees,
    undetectedTrees,
    estimatedYield,
    treesNumber,
    orangesPerTree,
    processed: true,
  };
}

function calculateEstimatedYield(totalOranges, treesNumber) {
  if (treesNumber === 0) return 0;

  // Середня вага апельсина, наприклад, 0.2 кг (200 грам)
  const averageWeightPerOrange = 0.2; // кг

  // Загальна вага апельсинів на всі дерева
  const totalWeight = totalOranges * averageWeightPerOrange;

  // Поділити на кількість дерев, якщо потрібно оцінити на кожне дерево
  const estimatedYield = totalWeight / treesNumber;

  // Повертає загальну вагу врожаю
  return estimatedYield;
}

module.exports = calculateMetrics;
