const router = require("express").Router();
const fs = require("fs");

let settings = require("../data/settings.json").settings;
const fileName = "data/settings.json"

function writeToFile(fileName, data) {
  // What if there are a lot of the paintings in the JSON file?
  fs.writeFileSync(fileName, JSON.stringify(data, null, 4));
}

router.get("/", (req, res) => {
  res.json(settings);
});

router.put("/", (req, res) => {
  settings = req.body.settings;

  writeToFile(fileName, { settings: settings });
  res.end();
});

module.exports = router;
