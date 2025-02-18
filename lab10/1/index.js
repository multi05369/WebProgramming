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


// routing path
app.get('/', function (req, res) {
  res.render('home');
});

app.get('/show', function (req, res) {
  const query = ' SELECT * FROM employees; ';
  db.all(query, (err, rows) => {
    if (err) {
      console.log(err.message);
    }
    console.log(rows);
    res.render('showData', { data: rows });
  });
});

app.get('/delete',function(req, res) {
  // Deleting Data

  let id = req.query.id;

  let sql = `DELETE FROM employees WHERE EmployeeID = ${id};`;
  // delete a row based on id
  db.run(sql, function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) deleted.`);
  });
});

app.get('/formget', function (req, res) {
  let formdata = {
    id: req.query.id,
    fname: req.query.fname,
    lname: req.query.lname,
    title: req.query.title,
    phone: req.query.phone,
    email: req.query.email

  };
  let sql = `INSERT INTO employees (EmployeeID, LastName, FirstName, Title, Phone, Email) 
  VALUES (${formdata.id}, '${formdata.lname}', '${formdata.fname}', '${formdata.title}', '${formdata.phone}', '${formdata.email}');`;
  db.run(sql, function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`a row inserted.`);
  });
  res.send('Data Inserted');
})

app.get('/form', function (req, res) {
  res.render('form');
});



// Starting the server
app.listen(port, () => {
  console.log(`Server started. On Port ${port}`);
});
