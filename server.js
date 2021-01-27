var express = require('express')
var path = require("path");
var fs = require("fs");

var dataFile = [];
var notes = [];
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
    res.json(JSON.parse(data));
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
    // id: noteId,
    title: noteTitle,
    text: noteText
  }

  fs.appendFile("./db/db.json", `{"title": "${req.body.title}", "text": "${req.body.text}"},`, function (err) {
    if (err) throw err;
      // console.log("write file successful");
      i++;
      res.send("Success");
  })
});

app.delete("/api/notes/:id", function (req, res) {
  fs.readFile("./db/db.json", function (err, data) {
    dataFile = data;
    var noteId = req.params.id;
    var temp = [];
    for (var j = 0; j < dataFile.length; j++) {
      if (j !== parseInt(noteId)) {
        temp.push(dataFile[i])
      }
    }
    notes = temp;
    fs.writeFile("./db/db.json", JSON.stringify(notes), function (err) {
      if (err) throw err;
      res.send("note removed");
    })
  })
})

// Listens for the port and starts the server
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
