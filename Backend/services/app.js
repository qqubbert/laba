const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authApp = require('./js/auth')
const sanyaApp = require('./js/sanyok-services')

app = express();
app.use(express.json());
app.use(cookieParser());

// const corsOptions = {
//     origin: ['http://localhost:5173', 'http://localhost:5500', 'http://localhost:3000','http://localhost:3001', 'http://localhost:3002'], // Массив разрешенных источников
//     credentials: true,
// };

// app.use(cors(corsOptions));


// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', req.headers.origin || corsOptions.origin);
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     next();
// });

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
