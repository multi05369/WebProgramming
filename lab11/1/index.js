const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('employees.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});


// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("Hello! REST API");
});


// Section 2 from diagram
app.get('/employees', (req, res) => {
    const query = 'SELECT * FROM employees;';
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.send(JSON.stringify(rows)); // ข้อมูลที่ได้มาเป็นรูปแบบ Object จึงต้องแปลงเป็น JSON String
    });
});

app.get('/employees/:id', (req, res) => {
    let id = req.params.id
    const query = `SELECT * FROM employees WHERE EmployeeID = ${id}; `;
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.send(JSON.stringify(rows));       
    });
});

// app.post('/employees/:id', (req, res) => {
//     let id = req.params.id
//     const query = `SELECT * FROM employees WHERE EmployeeID = ${id}; `;
//     db.all(query, (err, rows) => {
//         if (err) {
//             console.log(err.message);
//         }
//         console.log(rows);
//         res.send(JSON.stringify(rows));       
//     });
// });

// app.put('/employees/:id', (req, res) => {
//     let id = req.params.id
//     const query = `SELECT * FROM employees WHERE EmployeeID = ${id}; `;
//     db.all(query, (err, rows) => {
//         if (err) {
//             console.log(err.message);
//         }
//         console.log(rows);
//         res.send(JSON.stringify(rows));       
//     });
// });

// Section 3 from diagram
app.get("/show", (req, res) => {
    const endpoint = 'http://localhost:3000/employees';    
    fetch(endpoint)
        .then(response => response.json())
        .then(empl => {
            console.log(empl);
            res.render('show', { data: empl });            
        })
        .catch(error => {
            console.log(error);
        });
});

app.get("/aqi", (req, res) => {
    // city=ชื่อเมือง country=ตัวย่อประเทศ 
    const endpoint = 'http://10.0.15.21:8000/weather/bangkok/th';    
    fetch(endpoint)
        .then(response => response.json())
        .then(airq => {
            console.log(airq);
            res.render('aqi', { data: airq });
        })
        .catch(error => {
            console.log(error);
        });
});

app.listen(port, () => {
  console.log(`Starting node.js at port ${port}`);
});