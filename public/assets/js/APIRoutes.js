var express = require('express');
var app = express();
var fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var notes = [];
i = 0;

app.get("/api/notes", function (req, res) {
  fs.readFile("/db/db.json", function (err, data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  })
})

app.post("/api/notes", function (req, res) {
  var noteId = i;
  var noteTitle = req.body.title;
  var noteText = req.body.text;

  fs.writeFile("/db/db.json", JSON.stringify(res.send(noteId + " " + noteTitle + " " + noteText)), function (err) {
    if (err) throw err; 
    else {
      console.log("write file successful");
      i++;
    }
  })
});

app.delete ("/api/notes/:id", function (req, res) {
  var noteId = req.params.id;
  for (var j = 0; j <db.json.length; j++) {
    if (j !== parseInt(noteId)) {
      notes.push(res.json(JSON.parse(res[j])));
    }
  }
  res.send("note removed");
  return res.json(notes);
})