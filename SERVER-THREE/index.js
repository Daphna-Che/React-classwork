const express = require("express");
const app = express();

app.get("/", function (req, res) {
  return res.send({
    message: "Hello!!!  Third server here!",
  });
});

app.get("/Adee", function (req, res) {
  return res.send({
    message: "Welcome to this page",
  });
});

app.listen(3000, function () {
  console.log("listening on port 3000");
});
