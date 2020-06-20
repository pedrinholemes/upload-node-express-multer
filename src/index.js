require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const nunjucks = require('nunjucks')

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.resolve("tmp", "uploads")));
app.use(express.static("public"));
nunjucks.configure('src/views', {
    express: app,
    noCache: true
})


app.use(require("./routes"));

app.listen(process.env.PORT || 3000);