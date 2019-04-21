var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");
var session = require("express-session");
var socketio = require("socket.io")

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
  cookie: { secure: false }
}))

// use ejs
app.set("views", __dirname + "/apps/views");
app.set("view engine", "ejs");

// Public folder
app.use("/static", express.static(__dirname + "/public"));

// Controller
var controllers = require(__dirname + "/apps/controllers");

app.use(controllers);

var host = config.get("server.host");
var port = config.get("server.port");

var server = app.listen(port, host, function () {
    console.log("Server is running on port ", port);
});

// using socket io
var io = socketio(server);
var socketcontrol = require("./apps/common/socketcontrol")(io);