var express = require('express')

// Create express server and apply to app variable
var app = express();

// Initial port
var PORT = process.env.PORT || 3000;

// Setup Express app variable to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes to where the user's interactions will take them during the application's use
require("./HTMLRoutes");
require("./APIRoutes");

// Listens for the port and starts the server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
