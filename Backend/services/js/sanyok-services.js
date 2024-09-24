const express = require('express');
const mysql = require("mysql");

const sanyaApp = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "spiritbinge",
    database: "lab",
});

// sanyaApp.get('/pensil', (req, res) => {
//     res.send('penis');
// }); xuy

sanyaApp.post("/chatmsgs", (req, res) => {
    const {id} = req.body;
    console.log(id);
    const MsgDaiMne = `
    SELECT * FROM chat_msgs WHERE chat_id = ?;
    `
    db.query(MsgDaiMne, [id], (err, rs) => {
        console.log(rs);
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(rs)
        }
    })
});

module.exports = sanyaApp;