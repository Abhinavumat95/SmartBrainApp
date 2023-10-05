const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signIn = require("./controllers/signIn");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1", //localhost
    //port : 5432,
    user: "postgres",
    password: "test",
    database: "smart-brain-app-db",
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/signin", (req,res) => {signIn.handleSignIn(req,res,db,bcrypt)});
app.post("/register", (req,res) => {register.handleRegister(req,res,db,bcrypt)});
app.get("/profile/:id", (req,res) => {profile.handleProfile(req,res,db,bcrypt)});
app.put("/image", (req,res) => {image.handleImage(req,res,db,bcrypt)});

app.listen(3000, () => {
  console.log("App is running on port 3000.");
});
