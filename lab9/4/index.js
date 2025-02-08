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

app.get("/song", function (req, res) {
    const sql = `
        SELECT song_name, artist_name, YEAR(song_release_date) AS release_year, song_type 
        FROM artists 
        JOIN songs 
        ON artists.artist_id = songs.artist;
    `;
    
    conn.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.render('song', { data: result });
    });
    console.log("Show Table successfully.");
});

app.get("/", function(req, res) {
    res.redirect("/song");
});

app.listen(port, () => {
    console.log(`This Web Server is running on port ${port}`);
});