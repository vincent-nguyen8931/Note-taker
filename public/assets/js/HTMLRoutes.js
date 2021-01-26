var express = require('express')
var app = express()

app.get("notes", function (req, res) {
  res.send("notes.html")
})

app.get("*", function (req, res) {
  res.send("index.html")
})