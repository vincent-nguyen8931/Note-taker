var express = require('express');
var app = express();
var fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var dataFile = [];
var notes = [];
i = 0;

app.get("/api/notes", function (req, res) {
  fs.readFile("../../db/db.json", function (err, data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  })
})

app.post("/api/notes", function (req, res) {
  var noteId = i;
  var noteTitle = req.body.title;
  var noteText = req.body.text;

  fs.writeFile("../../db/db.json", JSON.stringify(noteId + " " + noteTitle + " " + noteText), function (err) {
    if (err) throw err; 
    else {
      // console.log("write file successful");
      i++;
      res.send("Success");
    }
  })
});

app.delete ("/api/notes/:id", function (req, res) {
  fs.readFile("../../db/db.json", function (err, data) {
    dataFile = data;
  var noteId = req.params.id;
  var temp = [];
  for (var j = 0; j < dataFile.length; j++) {
    if (j !== parseInt(noteId)) {
      temp.push(dataFile[i])
    }
  }
  notes = temp;
  fs.writeFile("../../db/db.json", JSON.stringify(notes), function (err) {
    if (err) throw err;
    res.send("note removed");
  })
  
})
})