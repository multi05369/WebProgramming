const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('questions.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

// static resourse & template engine
app.use(express.static("public"));
// Set EJS as templating engine
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    const sql = `SELECT * FROM questions;`;

    db.all(sql, [], function (err, rows) {
        if (err) {
            console.error(err.message);
            return res.status(500).send("Database error");
        }
        res.render("questions", { data: rows });
    });
});

app.listen(port, () => {
    console.log(`This Web Server is running on port ${port}`);
  });