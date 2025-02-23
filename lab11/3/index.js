const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('todo.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

// static resourse & template engine
app.use(express.static("public"));
// Set EJS as templating engine
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    const endpoint = 'http://localhost:3000/todo';
    fetch(endpoint)
        .then(response => response.json())
        .then(todo => {
            console.log(todo);
            res.render("todo", { data: todo });
        });
});

app.get("/todo", function (req, res) {
    const query = 'SELECT * FROM todo ORDER BY ID ASC;';
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.send(JSON.stringify(rows)); // ข้อมูลที่ได้มาเป็นรูปแบบ Object จึงต้องแปลงเป็น JSON String
    });
})

app.get("/create", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/create.html"));
});

app.post("/createTodo", function (req, res) {
    const title = req.body.Title;
    const description = req.body.Description;
    const deadline = req.body.Deadline;
    const query = `INSERT INTO todo (Title, Description, Deadline) VALUES ('${title}', '${description}', '${deadline}');`;
    db.run(query, (err) => {
        if (err) {
            console.log(err.message);
        }
        console.log("New todo created.");
    });
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`This Web Server is running on port ${port}`);
});