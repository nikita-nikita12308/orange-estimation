const { program } = require("commander");
const mongoose = require("mongoose");
const { seedDB, clearDB } = require("./utils/seed");

// Підключаємося до MongoDB
mongoose
  .connect("mongodb://localhost:27017/photoProcessingDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Команда для заповнення бази
program
  .command("seed <pointsFile>")
  .description("Seed the database with data from a points JSON file")
  .action((pointsFile) => {
    seedDB(pointsFile);
  });

// Команда для очищення бази
program
  .command("clear")
  .description("Clear the database")
  .action(() => {
    clearDB();
  });

program.parse(process.argv);

// node index.js seed ./utils/pointsData.json
// node index.js clear
