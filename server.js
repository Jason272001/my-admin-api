// first : (npm install node) in file path
//second : (npm inti -y ) for package. json
// third : (npm install nodemon --save-dev)nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
const express = require("express");
const bodyParser = require("body-parser"); //for http json data transfer
const bcrypt = require("bcrypt-nodejs"); //password hash;
const cors = require("cors"); //resource shared for divverent servers.
const app = express();
const knex = require("knex"); //database frameworked

const signin = require("./controllers/signin");
const signup = require("./controllers/signup");
const project = require("./controllers/project");
const display = require("./controllers/display");
const update = require("./controllers/update");
const del = require("./controllers/delete");
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",

    user: "postgres",
    password: "MeMe1965",
    database: "portfolio",
  },
});

app.use(bodyParser.json());
app.use(cors());

app.use(express.static("public"));

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  signup.handleSignup(req, res, db, bcrypt);
});

app.post("/project", (req, res) => {
  project.handleproject(req, res, db);
});

app.get("/display", (req, res) => {
  display.handleDisplay(req, res, db);
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  update.handleUpdate(req, res, db, id);
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  del.handleDelete(req, res, db, id);
});

app.get("/display/:id", (req, res) => {
  const { id } = req.params;
  display.handleDisplay(req, res, db, id);
});

app.listen(3500, () => {
  console.log("app runing port 3500");
});
