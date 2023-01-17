const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const data = require("./InitialData.js");
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/api/student", (req, res) => {
  res.send(data);
});

app.get("/api/student/:id", (req, res) => {
  let s1 = data.findIndex((e) => e.id == req.params.id);
  if (s1 > 0) {
    res.status(200).send(data[s1]);
  } else {
    res.status(404).send("<center><h1>Record Not Found</h1></center>");
  }
});

app.post("/student", (req, res) => {
  if (
    req.body.name != undefined &&
    req.body.currentClass != undefined &&
    req.body.division != undefined
  ) {
    let newRec = {
      id: Date.now(),
      name: req.body.name,
      currentClass: Number(req.body.currentClass),
      division: req.body.division,
    };
    data.push(newRec);
    res.status(200).json({
      message: "Succesfully Added",
      id: newRec.id,
    });
  } else {
    res.status(400).json({ massage: "All fields not set" });
  }
});

app.put("/student/:id", (req, res) => {
  console.log(req.params.id);
  let bool = true;
  data.map((data) => {
    if (data.id == req.params.id) {
      bool = false;
      data.name = req.body.name;
      res.json({ name: req.body.name });
    }
  });
  if (bool) {
    res.status(400).send("bad request");
  }
});

app.delete("/api/student/:id", (req, res) => {
  let index = data.findIndex((e) => e.id == req.params.id);
  if (index >= 0) {
    data.splice(index, 1);
    res.json({ massage: "Student data deleted" });
  } else res.status(400).json({ massage: "Id not found" });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
