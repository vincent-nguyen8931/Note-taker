var express = require('express')
var app = express()
var fs = require("fs")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/notes", function (req, res) {
  fs.readFile("/db/db.json", function (err, data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  })
})

app.post("/api/notes", function (req, res) {
  var noteTitle = req.body.title;
  var noteText = req.body.text;

  fs.writeFile("/db/db.json", JSON.stringify(res.send(noteTitle + " " + noteText)), function (err) {
    if (err) throw err;
    console.log("write file successful");
  })
});