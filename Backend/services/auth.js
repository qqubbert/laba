const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mysql = require("mysql");

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "spiritbinge",
    database: "lab",
});

app.get('/hello/:id', (req, res) => {
    let id = req.params.id;
    res.send("LOL " + id);
});

app.post('/post', (req, res) => {
    const { dickLen } = req.body;
    if (dickLen > 15) {
        res.send('NICE хуй');
    } else {
        res.send('Смол dick');
    }
});

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Node.js service is running on http://localhost:${PORT}`);
        });
    } catch (e){
        console.log(e);
    }
}

start();
