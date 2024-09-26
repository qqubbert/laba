const cors = require('cors');
const express = require('express');
const mysql = require("mysql");

const sanyaApp = express();
sanyaApp.use(express.json());
sanyaApp.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,               
}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "spiritbinge",
    database: "lab",
});

// sanyaApp.get('/pensil', (req, res) => {
//     res.send('penis');
// }); xuy

sanyaApp.get("/chatmsgs/:chat_id", (req, res) => {
    const {chat_id} = req.params.chat_id;
    console.log(chat_id);
    const MsgView = `
    SELECT * FROM chat_msgs WHERE chat_id = ?;
    `;
    db.query(MsgView, [chat_id], (err, rs) => {
        console.log(rs);
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(rs)
        }
    })
});

sanyaApp.get("/chatusers/:chat_id", (req, res) => {
    const{chat_id} = req.params.chat_id;
    console.log(chat_id);
    const ChatUserView = `
    SELECT cu.chat_id, c.title AS chat_title, u.ID AS user_id, u.Login, u.FirstName, u.LastName FROM chat_users cu JOIN  Users u ON cu.user_id = u.ID JOIN chats c ON cu.chat_id = c.id WHERE cu.chat_id = ?;
    `;
    db.query(ChatUserView, [chat_id], (err, rs) => {
        console.log(rs);
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(rs)
        }
    })
});

sanyaApp.post("/chatcreate", (req, res) => {
    const{title, ID} = req.body;
    console.log(title + " " + ID);
    // const token = req.cookies.token;
    const ChatCreate = `
    INSERT INTO chats (title)
    VALUES
        (?);
    `;
    db.query(ChatCreate, [title, ID], (err, rsChat) => {
        if (err) {
            console.log(err);
        } else {
            const chatID = rsChat.insertId;
            const UserChat = `
            INSERT INTO chat_users (user_id, chat_id)
            VALUES
                (?, ?);
            `;
            db.query(UserChat, [chatID, ID], (err, rsUserChat) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("New Chat Created!");
                    res.status(200).json(rsUserChat);
                }
            });
        }
    });
});

module.exports = sanyaApp;