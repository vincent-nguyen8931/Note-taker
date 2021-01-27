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

// Routes to where the user's interactions will take them during the application's use
// require("./assets/routes/HTMLRoutes");
// require("./assets/routes/APIRoutes");

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "assets/notes.html"));
})

app.get("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", function (err, data) {
    if (err) throw err;
    // res.json(JSON.stringify(data));
  })
})

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "assets/index.html"));
})

app.post("/api/notes", function (req, res) {
  var noteId = i;
  var noteTitle = req.body.title;
  var noteText = req.body.text;
  var noteDetails = {
    id: noteId,
    title: noteTitle,
    text: noteText
  }
  var noteArray = []
  noteArray.push

  // notes = JSON.stringify(noteId + " " + noteTitle + " " + noteText);


  fs.appendFile("./db/db.json", noteArray.push(noteDetails), function (err) {
    if (err) throw err;
      i++;
      res.send("Success");
  })
});

app.delete("/api/notes/:id", function (req, res) {
  fs.readFile("./db/db.json", JSON.parse(notes), function (err, data) {
    dataFile = data;
    var noteId = req.params.id;
    var temp = [];
    for (var j = 0; j < dataFile.length; j++) {
      if (j !== parseInt(noteId)) {
        temp.push(dataFile[i])
      }
    }
    recreateNotes = temp;
    fs.writeFile("./db/db.json", JSON.parse(recreateNotes), function (err) {
      if (err) throw err;
      res.send("note removed");
    })
  })
})

// Listens for the port and starts the server
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
