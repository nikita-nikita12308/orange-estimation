const mongoose = require("mongoose");
const Plot = require("../models/Plot");
const User = require("../models/User");
const Point = require("../models/Point");
const fs = require("fs"); // Для роботи з файловою системою

const seedDB = async (pointsFilePath) => {
  try {
    // Спочатку очищаємо базу (необов'язково, якщо хочете додавати без очищення)
    await clearDB();

    // Зчитуємо дані про точки з файлу
    const pointsData = JSON.parse(fs.readFileSync(pointsFilePath, "utf-8"));

    // Створюємо нового користувача
    const user = new User({
      name: "John Doe",
      email: "john@example.com",
      password: "password123", // Потім потрібно захешувати
    });

    await user.save();

    // Створюємо новий Plot
    const plot = new Plot({
      user_id: user._id,
      name: "block11",
      processed: true,
      number_of_oranges: 2558,
      detected_trees: 98,
      undetected_trees: 6,
      estimated_yield: 210,
      trees_number: 29,
      oranges_per_tree: 14,
      location: "North California",
      date: new Date("2016-05-18T16:00:00Z"),
      crop_type: "Oranges",
      av_tree_age: 14,
      imageBounds: [
        [35.436688384569486, 23.915630609298653],
        [35.435434907217974, 23.919499330381104],
      ],
      imagesSources: {
        basic: "/map4.png",
        bw: "/map2.png",
      },
    });

    await plot.save();

    // Створюємо точки для plot з даних файлу
    for (let i = 0; i < pointsData.length; i++) {
      const point = new Point({
        plotId: plot._id,
        latitude: pointsData[i].latitude,
        longitude: pointsData[i].longitude,
        numberOfOranges: pointsData[i].numberOfOranges,
        imageUrl: pointsData[i].imageUrl,
      });

      await point.save();
    }

    console.log("Database has been seeded!");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    process.exit(0);
  }
};

// Очищаємо базу даних
const clearDB = async () => {
  try {
    await User.deleteMany({});
    await Plot.deleteMany({});
    await Point.deleteMany({});
    console.log("Database has been cleared!");
  } catch (err) {
    console.error("Error clearing database:", err);
  }
};

module.exports = { seedDB, clearDB };
