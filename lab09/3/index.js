const express = require("express");
const path = require("path");
const argon2 = require("argon2");
const conn = require("./dbconn.js");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

// Route to handle form submission

app.get("/check_login", (req, res) => {
    let formdata = {
        userInput: req.query.userInput, // Can be username or email
        password: req.query.password
    };

    console.log("Received Data:", formdata);

    let sql = `SELECT password FROM users WHERE username = ? OR email = ?`;

    conn.query(sql, [formdata.userInput, formdata.userInput], async (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Database error.");
        }

        if (result.length === 0) {
            return res.status(401).send("Invalid username/email or password.");
        }

        let storedHash = result[0].password;

        try {
            // Verify the password
            if (await argon2.verify(storedHash, formdata.password)) {
                console.log("Login successful!");
                return res.send("Login successful.");
            } else {
                console.log("Invalid password.");
                return res.status(401).send("Invalid username/email or password.");
            }
        } catch (err) {
            console.error("Error verifying password:", err);
            return res.status(500).send("Error verifying password.");
        }
    });
});



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

app.get("/signin", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/signin.html"));
})

app.listen(port, () => {
    console.log(`This Web Server is running on port ${port}`);
});
