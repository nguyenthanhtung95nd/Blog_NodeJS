var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");
var session = require("express-session");

var app = express();
// body parser
app.use(bodyParser.json());
// get body content when form submit
app.use(bodyParser.urlencoded({ extended: true }));
// config session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: config.get("secret_key"),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// use ejs
app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");

var controllers = require(__dirname + "/apps/controllers");

app.use(controllers);

var host = config.get("server.host");
var port = config.get("server.port");

app.listen(port, host, function () {
    console.log("Server is running on port ", port);
});