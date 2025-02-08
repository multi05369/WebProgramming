const express = require("express");
const path = require("path");
const argon2 = require("argon2");
const conn = require("./dbconn.js");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

// Route to handle form submission
app.get("/process_get", async (req, res) => {
    let formdata = {
        username: req.query.username,
        password: req.query.password,  // We'll hash this
        email: req.query.email,
        name: req.query.name,
        surname: req.query.surname,
        age: req.query.age,
        address: req.query.address,
        phone: req.query.phone
    };

    console.log("Received Data:", formdata);

    try {
        // Hash the password before storing
        const hashedPassword = await argon2.hash(formdata.password);
        console.log("Hashed Password:", hashedPassword);

        let sql = `INSERT INTO users (username, password, email, firstname, lastname, age, address, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        
        conn.query(sql, [formdata.username, hashedPassword, formdata.email, formdata.name, formdata.surname, formdata.age, formdata.address, formdata.phone], function (err, result) {
            if (err) {
                console.error("Error inserting data:", err);
                return res.status(500).send("Database error.");
            }
            console.log("Record inserted successfully.");
            res.send("Record inserted successfully.");
        });
    } catch (err) {
        console.error("Error hashing password:", err);
        res.status(500).send("Error processing request.");
    }
});

// Route to serve the form
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/form.html"));
});

app.listen(port, () => {
    console.log(`This Web Server is running on port ${port}`);
});
