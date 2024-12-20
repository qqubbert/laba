const cors = require('cors');
const express = require('express');
const mysql = require("mysql");
const cookieParser = require('cookie-parser');

const sanyaApp = express();
sanyaApp.use(express.json());
// sanyaApp.use(cookieParser());
// const corsOptions = {
//     origin: ['http://localhost:5173', 'http://localhost:5500'], // Массив разрешенных источников
//     credentials: true,
// };
// sanyaApp.use(cors(corsOptions));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "spiritbinge",
    database: "lab",
});

// sanyaApp.get('/pensil', (req, res) => {
//     res.send('penis');
// }); xuy

sanyaApp.get("/chats", (req, res) => {
    const user_id = req.cookies.userid;
    console.log(user_id);
    const getChats = `
    SELECT * FROM chats c LEFT JOIN chat_users cu ON c.id = cu.chat_id WHERE cu.user_id = ?;
    `
    db.query(getChats, [user_id], (err, rs) => {
        console.log(rs);
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(rs);
        }
    });
});

sanyaApp.get("/chatmsgs/:chatid", (req, res) => {
    const chatid = req.params.chatid;
    let user_id = req.cookies.userid;
    console.log(req.params);
    console.log(chatid + " " + user_id);
    const inChat = `
    SELECT * FROM chat_users WHERE chat_id = ? AND user_id = ?;
    `
    db.query(inChat, [chatid, user_id], (err, rsIn) => {
        console.log(rsIn);
        if (err) {
            console.log(err);
        } else if (rsIn.length >= 1) {
            const MsgView = `
            SELECT 
                cm.id,
                cm.sender_id,
                cm.msg,
                DATE_FORMAT(cm.msg_date, '%Y-%m-%d %H:%i:%s') AS msg_date,
                cm.pinned,
                u.FirstName,
                u.LastName,
                u.Surname,
                u.ProfilePicLink,
                GROUP_CONCAT(mm.file_link) AS files
            FROM 
                chat_msgs AS cm 
            JOIN 
                Users AS u ON cm.sender_id = u.ID
            LEFT JOIN 
                msg_media AS mm ON cm.id = mm.msg_id
            WHERE 
                cm.chat_id = ?
            GROUP BY
                cm.id, cm.sender_id, cm.msg, cm.msg_date, cm.pinned, u.FirstName, u.LastName, u.Surname, u.ProfilePicLink
            ORDER BY
                cm.msg_date ASC;
            `;
            db.query(MsgView, [chatid], (err, rs) => {
                console.log(rs);
                if (err) {
                    console.log(err);
                } else {
                    res.status(200).json({rs, user_id})
                }
            });
        } else {
            res.status(401).json({message: "User is not in this chat!"});
        }
    });
});

sanyaApp.get("/chatusers/:chat_id", (req, res) => {
    const chat_id = req.params.chat_id;
    console.log(chat_id);
    const ChatUserView = `
    SELECT 
        cu.chat_id, 
        c.title AS chat_title, 
        u.ID AS user_id,  
        u.FirstName, 
        u.LastName,
        u.Surname,
        u.ProfilePicLink
    FROM 
        chat_users cu 
    JOIN 
        Users u ON cu.user_id = u.ID 
    JOIN 
        chats c ON cu.chat_id = c.id 
    WHERE 
        cu.chat_id = ?;
    `;
    db.query(ChatUserView, [chat_id], (err, rs) => {
        console.log(rs);
        if (err) {
            console.log(err);
        } else {
            res.status(200).json(rs)
        }
    });
});

sanyaApp.post("/chatcreate", (req, res) => {
    const{title} = req.body;
    console.log(req.cookies);
    const ID = req.cookies.userid;
    console.log(title + " " + ID);
    // const token = req.cookies.token;
    const ChatCreate = `
    INSERT INTO chats (title)
    VALUES
        (?);
    `;
    db.query(ChatCreate, [title, ID], (err, rsChat) => {
        console.log(rsChat);
        if (err) {
            console.log(err);
        } else {
            const chatID = rsChat.insertId;
            const UserChat = `
            INSERT INTO chat_users (user_id, chat_id)
            VALUES
                (?, ?);
            `;
            db.query(UserChat, [ID, chatID], (err, rsUserChat) => {
                console.log(rsUserChat);
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

sanyaApp.post("/privatechat", (req, res) => {
    const ID = req.cookies.userid;
    const{user_id} = req.body;
    console.log(ID + " " + user_id);
    const chatCreated = `
    SELECT c.id,
    	   cu1.user_id,
           cu2.user_id
    FROM chats c
    JOIN chat_users cu1 ON cu1.chat_id = c.id
    JOIN chat_users cu2 ON cu2.chat_id = c.id
    WHERE c.private = true
      AND cu1.user_id = ?
      AND cu2.user_id = ?
    GROUP BY c.id
    `
    db.query(chatCreated, [ID, user_id], (err, rsChat) => {
        console.log(rsChat);
        if (err) {
            console.log(err);
        } else if (rsChat >= 1) {
            console.log(rsChat);
            res.status(200).json(rsChat);
        } else {
            const createChat = `
            INSERT INTO chats (private) VAUES (true);
            `
            db.query(createChat, [], (err, rsCreate) => {
                console.log(rsCreate);
                if (err) {
                    console.log(err);
                } else {
                    const chat_id = rsCreate.insertId;
                    const addUsers = `
                    INSERT INTO chat_users (user_id, chat_id) VALUES (?, ?), (?, ?);
                    `
                    db.query(addUsers, [ID, chat_id, user_id, chat_id], (err, rsAdd) => {
                        console.log(rsAdd);
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("New private chat created!");
                            res.status(200).json(rsAdd);
                        }
                    });
                }
            });
        }
    });
});

sanyaApp.post("/chatadduser", (req, res) => {
    const{chat_id, self} = req.body;
    let user_id;
    if (self) {
        user_id = req.cookies.userid;
    } else {
        user_id = req.body.user_id;
    };
    console.log(user_id + " " + chat_id);
    const inChat = `
    SELECT * FROM chat_users WHERE user_id = ? AND chat_id = ?;
    `
    db.query(inChat, [user_id, chat_id], (err, rsIn) => {
        console.log(rsIn);
        if (err) {
            console.log(err);
        } else if (rsIn.length >= 1) {
            res.status(409).json({messege: "User already is in chat!"});
        } else {
            const addUser = `
            INSERT INTO chat_users (user_id, chat_id)
            VALUES
                (?, ?);
            `
            db.query(addUser, [user_id, chat_id], (err, rs) => {
                console.log(rs);
                if (err) {
                    console.log(err);
                    // res.status(200).json({rs, message: "Новый участник добавлен"});
                } else {
                    console.log("New user added to chat!");
                    res.status(200).json(rs)
                }
            });
        }
    });
});

sanyaApp.post("/msgsend", (req, res) => {
    const{chat_id, msg, file_link} = req.body;
    let sender_id = req.cookies.userid;
    console.log("sender_id: "+sender_id);
    console.log("chat_id: "+chat_id);
    console.log("file_link: "+file_link);
    const inChat = `
    SELECT * FROM chat_users WHERE chat_id = ? AND user_id = ?;
    `;
    db.query(inChat, [chat_id, sender_id], (err, rsIn) => {
        console.log(rsIn);
        if (err) {
            console.log(err);
        } else if (rsIn.length >= 1) {
            console.log(chat_id + " " + sender_id + " " + msg);
            const sendMsg = `
            INSERT INTO chat_msgs (chat_id, sender_id, msg)
            VALUES
                (?, ?, ?);
            `;
            db.query(sendMsg, [chat_id, sender_id, msg], (err, rs) => {
                console.log(rs);
                if (err) {
                    console.log(err);
                } else {
                    const msg_id = rs.insertId;
                    if (file_link && file_link.length > 0) {
                        for (let i = 0; i < file_link.length; i++) {
                            const addFile = `
                            INSERT INTO msg_media (msg_id, file_link)
                            VALUES
                                (?, ?);
                            `;
                            db.query(addFile, [msg_id, file_link[i]], (err, rsAdd) => {
                                console.log(rsAdd);
                                if (err) {
                                    console.log(err);
                                } else if (i === file_link.length - 1) {
                                    console.log("Files linked!");
                                    res.status(200).json({rs, message: "Files linked!"});
                                };
                            });
                        };
                    } else {
                        console.log("Message sended!");
                        res.status(200).json(rs);
                    };
                };
            });
        } else {
            res.status(401).json({message: "User is not in this chat!"});
        };
    });
});

sanyaApp.patch("/taskupdate", (req, res) => {
    const{Progress, task_id} = req.body;
    console.log(Progress + " " + task_id);
    const taskUpdate = `
    UPDATE tasks SET Progress = ? WHERE ID = ?;
    `;
    db.query(taskUpdate, [Progress, task_id], (err, rs) => {
        console.log(rs);
        if (err) {
            console.log(err);
        } else {
            console.log("Task updated!");
            res.status(200).json(rs);
        };
    });
});

module.exports = sanyaApp;