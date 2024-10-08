const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authApp = require('./js/auth')
const sanyaApp = require('./js/sanyok-services')

app = express();
app.use('/auth', authApp);
app.use('/sanya', sanyaApp);
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5500'], // Массив разрешенных источников
    credentials: true,
};

app.use(cors(corsOptions));

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
