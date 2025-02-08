// index.js

const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// เพิ่มใช้งานไฟล์
const conn = require("./dbconn.js");

// static resourse & template engine
app.use(express.static(path.join(__dirname, "public")));
// Set EJS as templating engine
app.set('view engine', 'ejs');

// routing

app.get('/show', function (req, res) {

    // ให้แสดงข้อมูล จาก table instructor และ teaches
    // ดังนี้ ID name dept_name course_id semester year

    const sql = ' SELECT * FROM instructor; ';
    conn.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('show', { data: result })
        res.end()
    })
});

// 
app.get("/process_get", function (req, res) {
    let formdata = {
      id: req.query.id,
      name: req.query.name,
      deptname: req.query.deptname,
      salary: parseFloat(req.query.salary) || 0,  // Convert salary to number, default to 0 if NaN
    };
  
    console.log("Received Data:", formdata);
  
    if (!formdata.id || !formdata.name || !formdata.deptname || formdata.salary <= 0) {
      return res.status(400).send("Invalid input data.");
    }
  
    let sql = `INSERT INTO instructor (ID, name, dept_name, salary) VALUES (?, ?, ?, ?)`;
  
    conn.query(sql, [formdata.id, formdata.name, formdata.deptname, formdata.salary], function (err, result) {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).send("Database error.");
      }
      console.log("Record inserted successfully.");
      res.send("Record inserted successfully.");
    });
  });
  


app.get("/create", function (req, res) {
  // create table
  let sql = ` INSERT INTO instructor2 (ID, name, dept_name, salary) VALUES 
('10001', 'Smith', 'Computer Science', 90000),
('10002', 'Johnson', 'Mathematics', 85000),
('10003', 'Williams', 'Physics', 78000),
('10004', 'Brown', 'Chemistry', 82000),
('10005', 'Jones', 'Biology', 75000),
('10006', 'Garcia', 'History', 72000),
('10007', 'Miller', 'Philosophy', 68000),
('10008', 'Davis', 'Economics', 91000),
('10009', 'Rodriguez', 'Engineering', 97000),
('10010', 'Martinez', 'Statistics', 89000);;`;
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Insert to Table successfully.");
  });
  // insert data into table
  // ...
});

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/form.html"));
});

app.listen(port, () => {
  console.log(`This Web Server is running on port ${port}`);
});
