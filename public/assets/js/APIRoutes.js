var express = require('express')
var app = express()
var fs = require("fs")

app.get("/api/notes", function (req,res) {
  fs.readFile("/db/db.json", function (err, data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  })
})