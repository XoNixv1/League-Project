const express = require("express");
const { readFile } = require("fs").promises;
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/champ-list", async (req, res) => {
  try {
    const data = await readFile("./database.json", "utf-8");
    const parsedData = JSON.parse(data);

    res.json(parsedData);
  } catch (err) {
    console.log("Error reading champ file", err);
    res.status(500).send("Error reading champions file");
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/champ-list`);
});
