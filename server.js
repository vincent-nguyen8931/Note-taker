var express = require('express');
var path = require("path");
var fs = require("fs");

// var notes = JSON.stringify((path.join(__dirname, "db/db.json")));
// console.log(notes);
var dataFile = [];
var recreateNotes = [];
i = 0;

// Create express server and apply to app variable
var app = express();

// Initial port
var PORT = process.env.PORT || 3000;

// Setup Express app variable to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "assets")));

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "assets/notes.html"));
})

app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw err;
    res.json(JSON.parse(data));
  })
})

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "assets/index.html"));
})

app.post("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", res, function (err, data) {
    if (err) throw err;
    var dbNotes = JSON.parse(data);
    var noteArray = [];
    dbNotes.push(req.body);

    for (var j = 0; j < dbNotes.length; j++) {
      var newNote = {
        title: dbNotes[j].title,
        text: dbNotes[j].text,
        id: j
      }
      noteArray.push(newNote);
    }
    var noteData = JSON.stringify(noteArray)
    fs.writeFile("./db/db.json", noteData, function (err) {
      if (err) throw err;
      res.json(req.body);
    })
  })
});

// Deletes the note and rewrites the notes with the id updated
app.delete("/api/notes/:id", function (req, res) {
  fs.readFile("./db/db.json", res, function (err, data) {
    dataFile = JSON.parse(data);
    var noteId = dataFile
    var temp = [];
    for (var j = 0; j < dataFile.length; j++) {
      if (j !== parseInt(noteId[j].id)) {
        temp.push(dataFile[j])
      }
    }
    recreateNotes = temp;
    fs.writeFile("./db/db.json", JSON.stringify(recreateNotes), function (err) {
      if (err) throw err;
      res.send("note removed");
    })
  })
})

// Listens for the port and starts the server
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
