const router = require("express").Router();
const fs = require("fs");

let stocks = require("../data/stocks.json").stocks;
const fileName = "data/stocks.json";

function writeToFile(fileName, data) {
  // What if there are a lot of the paintings in the JSON file?
  fs.writeFileSync(fileName, JSON.stringify(data, null, 4));
}

// Getting a list of stocks
router.get("/", (req, res) => {
  res.json(stocks);
});

// Update a existing stock
router.put("/", (req, res) => {
  let reqStockIndex = stocks.findIndex(obj => {
    return obj.symbol === req.body.stock.symbol;
  });

  if (reqStockIndex === -1) {
    console.log("Invalid symbol");
    res.end();
    return;
  }

  stocks[reqStockIndex] = req.body.stock;
  stocks[reqStockIndex].price = Number(stocks[reqStockIndex].price);
  stocks[reqStockIndex].amount = Number(stocks[reqStockIndex].amount);
  stocks[reqStockIndex].maxStep = Number(stocks[reqStockIndex].maxStep);

  writeToFile(fileName, { stocks: stocks });

  res.end();
});

// Delete a stock
router.delete("/:symbol", (req, res) => {
  let reqStockIndex = stocks.findIndex(obj => {
    return obj.symbol === req.params.symbol
  });
  if (reqStockIndex === -1) {
    console.log("Invalid symbol");
    res.end();
    return;
  }

  stocks.splice(reqStockIndex, 1);
  writeToFile(fileName, { stocks: stocks });

  res.end();
});

// Add a new stock
router.post("/", (req, res) => {
  let newStock = req.body.stock;

  stocks.push(newStock);
  writeToFile(fileName, { stocks: stocks });

  res.end();
});


module.exports = router;