var express = require('express')
var app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {
  res.send("notes.html")
})

app.get("*", function (req, rex) {
  res.send("index.html")
})