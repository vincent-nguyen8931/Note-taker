var router = require('express').Router();
var app = express();
var fs = require("fs");

var dataFile = [];
var notes = [];
i = 0;

router.get("/notes", function (req, res) {
  fs.readFile("../../db/db.json", function (err, data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  })
})

router.post("/notes", function (req, res) {
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

router.delete ("/notes/:id", function (req, res) {
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