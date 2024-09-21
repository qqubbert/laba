const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PORT = 3001;
const JWT_SECRET = 'abobaPenisDickHYUzalupka';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,               
}));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "spiritbinge",
    database: "lab",
});

app.get('/', (req, res) => {
    res.send("Hello, world!");
});

app.post('/cookieclear', async (req, res) => {
    res.cookie('token', null, {
        httpOnly: true,       
        secure: false,        
        sameSite: 'Lax',
    })
    res.json({ message: 'cookie с токеном очищен' })
})

app.post('/register', async (req, res) => {
    const { login, password } = req.body;

    console.log('login: ' + login);
    console.log('password: ' + password);

    const queryUser = `
    SELECT * FROM Users WHERE Login = ?;
    `

    db.query(queryUser, [login], async (err, result) => {
        if (err) {
            console.error('Ошибка сервера');
            return res.status(500).json({ message: "Ошибка сервера" })
        } else if (result.length >= 1) {
            console.log('Пользователь уже существует');
            return res.status(200).json({ message: "Пользователь уже зарегистрирован" });
        } else {
            const queryReg = `
            INSERT INTO Users (Login, Pass, Permission) VALUES (?, ?, 'user')
            `;

            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                db.query(queryReg, [login, hashedPassword], (err, result) => {
                    if (err) {
                        console.error('Ошибка при регистрации:', err);
                        return res.status(500).json({ message: "Ошибка сервера" });
                    }
                    res.status(201).json({ message: "Пользователь зарегистрирован!" });
                });
            } catch (err) {
                console.error('Ошибка при хэшировании пароля:', err);
                res.status(500).json({ message: "Ошибка сервера" });
            }      
        }
    })
});

app.post('/login', (req, res) => {
    const { login, password } = req.body;

    const query = `
    SELECT * FROM Users WHERE Login = ?
    `;

    console.log('login: ' + login);
    console.log('password: ' + password);

    db.query(query, [login], async (err, result) => {
        if (err) {
            console.error('Ошибка при логине:', err);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
        if (result.length === 0) {
            return res.status(400).json({ message: "Пользователь не найден" });
        }

        const user = result[0];
        const isPasswordValid = await bcrypt.compare(password, user.Pass);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Неправильный пароль" });
        }
        
        const token = jwt.sign({ id: user.ID, permission: user.Permission }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,       
            secure: false,        
            sameSite: 'Lax',       
            maxAge: 10 * 24 * 60 * 60 * 1000, // Срок жизни 30 дней
        });
        res.json({ token, message: 'Пользователь авторизован' });
    });
});

app.post('/protected', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Доступ запрещён" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Неправильный токен" });
        }
        res.json({ message: `Привет пользователь с ID: ${user.id}`, access: true });
    });
});

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
