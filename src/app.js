var express = require("express");
var cors = require("cors");
var morgan = require("morgan");

var port = process.env.PORT || 4000;
var db = require("./db");
var Controller = require("./controllers/");

var app = express();
app.use(cors());

app.use("/api", Controller);

app.listen(port, function () {
  console.log("Express server listening on port " + port);
});
