const express = require("express");
const config = require("../config");
const app = express();
const cors = require("cors");
const helmet = require("helmet");

app.use(helmet());
app.use(cors());

app.use("/people", require("../people/people.router"));
app.use("/pets", require("../pets/pets.router"));

module.exports = app;
