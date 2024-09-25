const express = require('express');
const mysql = require("mysql");

const sanyaApp = express();
sanyaApp.use(express.json());

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
    const {chat_id} = req.body;
    console.log(chat_id);
    const MsgDaiMne = `
    SELECT * FROM chat_msgs WHERE chat_id = ?;
    `
    db.query(MsgDaiMne, [chat_id], (err, rs) => {
        console.log(rs);
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(rs)
        }
    })
});

sanyaApp.post("/chatusers", (req, res) => {
    const{chat_id} = req.body;
    console.log(chat_id);
    const ChatUserDaiMne = `
    SELECT cu.chat_id, c.title AS chat_title, u.ID AS user_id, u.Login, u.FirstName, u.LastName FROM chat_users cu JOIN  Users u ON cu.user_id = u.ID JOIN chats c ON cu.chat_id = c.id WHERE cu.chat_id = ?;
    `
    db.query(ChatUserDaiMne, [chat_id], (err, rs) => {
        console.log(rs);
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(rs)
        }
    })
});

module.exports = sanyaApp;