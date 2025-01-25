const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authApp = require('./js/auth')
const sanyaApp = require('./js/chatsAndOther')

app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authApp);
app.use('/sanya', sanyaApp);

const PORT = 3001;

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Node.js service is running on http://localhost:${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
