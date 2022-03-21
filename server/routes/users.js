const router = require("express").Router();
const fs = require("fs");

let users = require("../data/users.json").users;
const fileName = "data/users.json";

function writeToFile(fileName, data) {
  // What if there are a lot of the paintings in the JSON file?
  fs.writeFileSync(fileName, JSON.stringify(data, null, 4));
}

router.get("/", (req, res) => {
  res.json(users);
});

router.put("/", (req, res) => {
  let reqUserIndex = users.findIndex(obj => {
    return obj.username === req.body.user.username
  });

  if (reqUserIndex === -1) {
    console.log("Invalid username");
    res.end();
    return;
  }

  users[reqUserIndex].budget = Number(req.body.user.budget);
  writeToFile(fileName, { users: users });

  res.end();
});

router.delete("/:username", (req, res) => {
  let reqUserIndex = users.findIndex(obj => {
    return obj.username === req.params.username
  });
  if (reqUserIndex === -1) {
    console.log("Invalid username");
    res.end();
    return;
  }

  users.splice(reqUserIndex, 1);
  writeToFile(fileName, { users: users });

  res.end();
});

router.post("/", (req, res) => {
  let newUser = req.body.user;

  users.push(newUser);
  writeToFile(fileName, { users: users });

  res.end();
});


module.exports = router;